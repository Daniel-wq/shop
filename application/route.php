<?php

use think\Route;
Route::resource('admin/category','admin/Category');
Route::resource('admin/goods','admin/goods');
Route::rule('/','home/Entry/index');

Route::group(['ext'=>'html'],function(){
    // method ：请求方法
    Route::rule('register','home/User/register');
    Route::rule('login','home/User/login');
    Route::rule('logout','home/User/logout');
    Route::rule('orderdel/:fid','home/User/orderDel');
});


Route::rule('/lists/:id','home/Entry/lists');
Route::rule('/content/:id','home/Entry/content');
Route::rule('/cart','home/Cart/lists');

Route::rule('/flow.php','home/Flow/index');
