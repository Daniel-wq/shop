<?php
define('IS_POST',$_SERVER['REQUEST_METHOD'] == 'POST'?true:false);

function p($var){
    echo '<pre style="background:#ccc;padding:10px">' . print_r($var,true) . '</pre>';
}

