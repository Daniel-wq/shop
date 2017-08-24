<?php

namespace app\home\controller;

use app\common\model\Cargo;
use app\common\model\Category;
use app\common\model\Goods;
use houdunwang\arr\Arr;
use think\Controller;
use think\Request;

class Common extends Controller
{
    /**
     * 获得栏目数据
     *
     * @return \think\Response
     */
    public function getCateData()
    {
        //获得栏目（HDPHP框架的数组增强）
        $cateData = Category::all();
        $cateData = Arr::channelLevel($cateData,$pid = 0, $html = "&nbsp;", $fieldPri = 'id', $fieldPid = 'pid');
        return $this->toArray($cateData);
    }

    /**
     * 获得对应的顶级栏目
     *
     * @return \think\Response
     */
    public function parentCategory($cid)
    {
        //获得对应cid栏目的名称
        $data = Category::where('id',$cid)->select();
        //$data = json_encode($data,true);
        return $data[0]['name'];
    }

    /**
     * 获得子栏目
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function sonCategory($pid)
    {
        //获得对应pid栏目的名称
        $sonData = Category::where('pid',$pid)->select();
        return $sonData;
    }

    /**
     * 获得商品信息
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function goods($id,$sid)
    {
        //获得子栏目
        $son = $this->sonCategory($id);
        //调用数组方法，将获得的数据转换为数组
        $son = $this->toArray($son);
        //定义数组，获得子栏目id,通过子栏目id来查询对应的数据
        $arr = [];
        foreach ($son as $s){
            array_push($arr,$s['id']);
        }
        $arr = $sid ? [$sid] : $arr;
        //获得cid对应顶级栏目下面的所有子栏目的商品
        $goods = Goods::where('id','in',$arr)->select();
        return $this->toArray($goods);
    }

    /**
     * 商品属性添加到商品中
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function goodsData($gid)
    {
        //获得商品数据
        $goodsData = Goods::where('id',$gid)->select();
        //获得商品属性
        $cargoData = Cargo::where('id',$gid)->select();
        $goodsData = $this->toArray($goodsData);
        //将商品属性添加到商品数据中
        $goodsData['Cargo'] = $this->toArray($cargoData);
        //p($goodsData);
        return $goodsData[0];
    }

    /**
     * 对象转为数组方法
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function toArray($var)
    {
        return json_decode(json_encode($var,true),true);
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
