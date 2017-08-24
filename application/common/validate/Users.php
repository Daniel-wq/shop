<?php
/**
 * Created by PhpStorm.
 * User: ziyun
 * Date: 2017/8/17
 * Time: 16:08
 */

namespace app\common\validate;


use think\Validate;

class Users extends Validate
{
    protected $rule = [
        // 用户名必填
        'extend_field5' => 'require',
        // 密码必填,密码最少6位
        'password'=>'require|confirm:confirm_password',
        // 确认密码
        'confirm_password'=>'require'
    ];

    protected $message = [
        'username.require' =>'请填写用户名',
        'password.require' =>'请填写用户名密码',
        'password.confirm' =>'两次密码不一致'
    ];

}