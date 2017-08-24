<?php

namespace app\common\model;

use think\Model;
use houdunwang\arr\Arr;
class Category extends Model
{
    protected $pk = 'id';
    protected $table='category';



    /**
     *将栏目数据处理为树状结构
     */
    public function getAllCate ()
    {
        //栏目所有数据
        $data = db('category')->select();
        //halt($data);
        //变为树状结构：所有数据、字段名称、主键id、父id
        return Arr::tree($data,'cname','cid','pid');
    }

    /**
     * 获取除了自己和自己子集之外的数据
     */
    public function getCateData($cid){
        //1.找到自己子集
        $cids = $this->getSon($cid,db('category')->select());
        //halt($cids);
        //2.j将自己追加进去
        $cids[] = $cid;
        //3.把自己和子集排除出去
        $res = db('category')->whereNotIn('cid',$cids)->select();
        //halt($res);
        //将其转为树状结构
        return Arr::tree($res,'cname','cid','pid');

    }
    /**
     * 寻找子集数据
     */
    public function getSon($cid,$data)
    {
        static $temp = [];
        foreach($data as $k=>$v){
            if($cid==$v['pid']){
                $temp[] = $v['cid'];
                $this->getSon($v['cid'],$data);
            }
        }
        return $temp;
    }
}
