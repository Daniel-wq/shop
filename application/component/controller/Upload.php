<?php namespace app\component\controller;

use think\Controller;

/**
 * 上传处理
 * Class Upload
 *
 * @package app\component\controller
 */
class Upload extends Controller
{
    /**
     * 上传图片webuploader
     *
     * @return mixed
     */
    public function uploader()
    {
        $file = request()->file('file');
        $info = $file->move(ROOT_PATH . 'public' . '/' . 'uploads');
        if($info){
            return json(['valid'=>1,'message'=>'/uploads/'.$info->getSaveName()]);
        }else{
            return ['valid'=>0,'message'=>'上传失败'];
        }
    }

    /**
     * 获取文件列表webuploader
     *
     * @return array
     */
    public function filesLists()
    {
        $Res  = db('attachment')
            ->whereIn('extension', explode(',', strtolower(input('post.extensions'))))
            ->order('id desc')->paginate(32);
        $data = [];
//        halt($Res->toArray());
        if ($Res->toArray()) {
            foreach ($Res as $k => $v) {
                $data[$k]['createtime'] = date('Y/m/d', $v['createtime']);
                $data[$k]['size']       = $v['size'];
                $data[$k]['url']        = IMG_PATH  .$v['path'];
                $data[$k]['path']       = $v['path'];
                $data[$k]['name']       = $v['name'];
            }
        }

        return ['data' => $data, 'page' => is_null($Res->render()) ? '' : $Res->render()];
    }

    /**
     * 删除图片
     * delWebuploader
     *
     * @return array
     */
    public function removeImage()
    {
        $db   = Db::table('attachment');
        $file = $db->where('id', $_POST['id'])->first();
        if (is_file($file['path'])) {
            unlink($file['path']);
        }
        $db->where('id', $_POST['id'])->where('uid', v('user.info.uid'))->delete();

        return ['valid' => 1, 'message' => '删除成功'];
    }
}