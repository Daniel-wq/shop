<?php

namespace app\admin\validate;

use think\Validate;

class Category extends Validate
{
	//验证规则
	protected $rule = [
		'name'=>'require|max:5'
	];
	//定义提示消息
	protected $message = [
		'name.require'  =>  '栏目名称必填',
		'name.max'  =>  '排序最大5个字符',
	];
	//验证场景
    protected $scene = [
        'save' => ['name'],
        'update' => ['name']
    ];

}