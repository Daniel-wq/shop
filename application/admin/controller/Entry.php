<?php

namespace app\admin\controller;

use app\common\model\Users;
use think\Controller;
use think\Request;
use think\Session;

class Entry extends Controller
{
    /**
     * 登陆
     *
     * @return \think\Response
     */
    public function login()
    {
        if (IS_POST){
            //接收过滤之后的数据
            $post = input('post.');
            $user = Users::where('username','=',$post['username'])->find();
            if (!$user || $user['password'] != md5($post['password'])){
                $this->error('用户名或者密码错误');
            }else{
                Session::set('user',$user->toArray());
                $this->success('登陆成功','Index/index');
            }
        }
        return $this->fetch();
    }

    /**
     * 退出
     *
     * @return \think\Response
     */
    public function logout()
    {
        //清楚当前请求有效的session
        Session::delete('user');
        $this->success('退出成功','login');
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        //
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
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete($id)
    {
        //
    }
}
