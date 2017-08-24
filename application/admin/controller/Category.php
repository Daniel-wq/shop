<?php

namespace app\admin\controller;

use houdunwang\arr\Arr;
use think\Controller;
use think\Request;
use app\common\model\Category as CategoryModel;
class Category extends Controller
{
    /**
     * 栏目列表
     *
     * @return \think\Response
     */
    public function index()
    {
        $data = CategoryModel::all();
        $data = Arr::tree($data,'name','id','pid');
        return view('index',compact('data'));
    }

    /**
     * 添加栏目
     *
     * @return \think\Response
     */
    public function create()
    {
        $data = CategoryModel::all();
        $data = \houdunwang\arr\Arr::tree($data,'name','id','pid');
        return view('create',compact('data'));
    }

    /**
     * 保存栏目
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $model = new CategoryModel();
        //调用验证器来验证
        $request = $model->validate(true)->save($request->post());
        if (false === $request){
            $this->error($model->getError());
        }
        $this->success('添加成功','/admin/category');
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
        //
    }

    /**
     * 编辑栏目
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = CategoryModel::all();
        $data = Arr::tree($data,'name','id','pid');
        foreach ($data as $k =>$v){
            //如果是自己的子栏目不能被选择
            if (Arr::isChild($data,$v['id'],$id,'id','pid')){
                $data[$k]['_disabled'] = 'disabled';
            }else{
                //如果是自己不能被选择
                $data[$k]['_disabled'] = $v['id'] == $id ? 'disabled' : '';
            }
        }
        //获得旧数据
        $oldData = CategoryModel::find($id);
        return view('',compact('data','oldData'));
    }

    /**
     * 保存更新的栏目
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        $data = [
            'name' => $request->post('name'),
            'pid' => $request->post('pid')
        ];
        CategoryModel::find($id)->save($data);
        $this->success('修改成功','/admin/category');
    }

    /**
     * 删除栏目
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete($id)
    {
        CategoryModel::destroy($id);
//        return['msg'=>'删除成功'];
        return $this->success('删除成功','/admin/category');
    }
}
