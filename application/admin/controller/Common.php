<?php

namespace app\admin\controller;

use think\Controller;
use think\Session;

class Common extends Controller
{
    public function _initialize()
    {
        //如果没有登陆就去跳转
        if (!Session::get('user')){
            //重定向到登陆
            $this->redirect('admin/Entry/login');
        }
    }
}
