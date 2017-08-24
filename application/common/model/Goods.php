<?php

namespace app\common\model;

use think\Model;

class Goods extends Model
{
    protected $pk = 'id';
    protected $table='goods';

    public function assCargos(){
        //会自动按照当前模型加上_id寻找关联字段，比如：cargos表里的goods_id
        return $this->hasMany(Cargo::class);
    }
}
