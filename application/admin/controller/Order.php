<?php

namespace app\admin\controller;

use app\common\model\Users;
use function PHPSTORM_META\elementType;
use think\Controller;
use think\Request;
use app\common\model\Flows;
class Order extends Controller
{
    /**
     * 订单列表
     *
     * @return \think\Response
     */
    public function lists()
    {
        //获取商品信息
        $userModel = new Users();
        $flowsInfo = Flows::all();
        //halt($flowsInfo);
        foreach ($flowsInfo as $k=>$v){
            $user = $userModel::get($v['user_id']);
            $flowsInfo[$k]['uesername'] = $user['username'];
        }
        return view('',compact('flowsInfo'));
    }


    /**
     * 更新订单
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update()
    {
        if (IS_POST){
            $id = input('post.id');
            $status = input('post.status');
            //更新订单表中的订单信息
            $model = Flows::get($id);
            $model->status = $status;
            $res = $model->save();
            if ($res){
                $this->success('更新成功','/admin/order/lists');
            }else{
                $this->error('更新失败');
            }
        }
        $id = input('id');
        //halt($id);
        $userModel = new Users();
        $data = Flows::get($id);
        //halt($data);
        $user = $userModel::get($data['user_id']);
        $username = $user['username'];
//        if ($data){
//            $data = $data->toArray();
//        }else{
//            $this->error('参数错误','/admin/order/lists');
//        }
        return view('',compact('data','username'));
    }

    /**
     * 只能删除已收货的订单
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function orderDel()
    {
        $fid = input('fid');
        $model = Flows::get($fid);
        if($model['status']=='已签收'){
            $res = $model->delete();
            if($res){
                $this->success('删除订单成功');
            }else{
                $this->error('删除订单失败');
            }
        }else{
            $this->error('货物正在路中，不能删除');
        }
    }
}
