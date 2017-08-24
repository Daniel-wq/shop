<?php

namespace app\home\controller;

use app\common\model\Category;
use app\common\model\Flows;
use houdunwang\arr\Arr;
use think\Controller;
use think\Request;
use app\common\model\Users as UserModel;
use think\Session;

class User extends Controller
{
    /**
     * 前台登陆
     *
     * @return \think\Response
     */
    public function login()
    {
        $categoryData = Category::all();
        $categoryData = Arr::tree($categoryData,'name','id','pid');

        //p(md5(11));
        if (IS_POST){
            $post=$this->request->post();
            $users=UserModel::all();
//            halt($users);exit;
            foreach ($users as $v){
                if ($v['username']==$post['username'] && $v['password']==md5($post['password'])){
                    Session::set('user_name',$v['username']);
                    Session::set('user_id',$v['id']);
                    $this->success('登录成功','/');
                }
            }
            $this->error('用户名或密码错误');
        }
        return view('',compact('categoryData'));
    }

    /**
     * 用户注册
     *
     * @return \think\Response
     */
    public function register()
    {
        $categoryData = Category::all();
        $categoryData = Arr::tree($categoryData,'name','id','pid');

        if(IS_POST){
            $post=$this->request->post();
            if($post['password']!=$post['password_confirm']) $this->error('两次密码不一致');
            $users=UserModel::all();
            foreach ($users as $v){
                if ($v['username']==$post['username']) $this->error('用户名或昵称已注册');
            }
            //halt($post);
            unset($post['password_confirm']);
            $post['password']=md5($post['password']);
            UserModel::create($post);
            $this->success('注册成功，请登录','/login.html');
        }
        return view('',compact('categoryData'));
    }

    /**
     * 用户退出
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function logout(Request $request)
    {
        // 清除session（当前作用域）
        //session(null);
        // 删除cookie
        Session::delete('user_name');

        $this->success('退出成功','/');
    }

    /**
     * 显示订单
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function orderlists()
    {
        //栏目信息
        $categoryData = Category::all();
        $categoryData = Arr::tree($categoryData,'name','id','pid');
        //从flows表中取出订单信息
        $flowInfo = Flows::where('user_id',Session::get('user_id'))->select();
        return view('',compact('categoryData','flowInfo'));
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
