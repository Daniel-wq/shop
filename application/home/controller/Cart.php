<?php

namespace app\home\controller;

use app\common\model\Category;
use app\common\model\Goods;
use houdunwang\arr\Arr;
use think\Controller;
use think\Request;
use think\Session;

class Cart extends Controller
{

    /**
     * 购物车列表
     *
     * @return \think\Response
     */
    public function lists()
    {
        $data = Session::get('cart.goods');
        //halt($data);
        //将商品信息添加
        if (!is_null($data)){
            foreach ($data as $k=>$v){
                $info = Goods::get($v['id'])->toArray();
                $data[$k]['info'] = $info;
            }
        }
        $data = json_encode($data,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        //p($data);
        $categoryData = Category::all();
        $categoryData = Arr::tree($categoryData,'name','id','pid');
        return view('',compact('categoryData','data'));
    }

    /**
     * 添加购物车
     *
     * @return \think\Response
     */
    public function add()
    {
        //获得提交的数据
        $post = input('post.');
        //file_put_contents('a.php',print_r($post,true));
        $data = [
            'id'      => $post['id'], // 商品 ID
            'name'    => $post['name'],
            'num'     => $post['num']*1,
            'price'   => $post['price'],
            'options' => $post['options'],
            'pics' => $post['pics'],
        ];
        $cart = new \helper\Cart();
        $cart->add($data);
        //return 1;
        exit;
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

        $Data = [
            "sid" => '027c9134',                        //商品的唯一SID，不是商品的ID
            "num" => 10,                                //商品数量
        ];
        $cart = new \helper\Cart();
        $cart->update($Data);
        $this->success('修改成功','lists');
    }

    /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete()
    {
        $sid = input('sid');
        $cart = new \helper\Cart();
        $cart->del($sid);
        $this->success('yes','/cart');
    }
}
