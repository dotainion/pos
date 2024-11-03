<?php
namespace src\module\image\objects;

use tools\infrastructure\Assert;
use tools\infrastructure\Env;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Image implements IObjects
{
    protected Id $id;
    protected Id $itemId;
    protected string $name;
    protected string $extention;

    public function __construct(){
        $this->id = new Id();
        $this->itemId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function itemId():IId{
        return $this->itemId;
    }

    public function image():string{
        return Env::imageDomain().'/pos-files/'.$this->fqFileName();
    }

    public function name():string{
        return $this->name;
    }

    public function fqFileName():string{
        return $this->id().'.'.$this->extention();
    }

    public function extention():string{
        return $this->extention;
    }

    public function size():string{
        $bytes = filesize(Env::rootDir().'/pos-files/'.$this->fqFileName());
        if($bytes >= 1073741824){
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        }elseif($bytes >= 1048576){
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        }elseif($bytes >= 1024){
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        }elseif ($bytes > 1){
            $bytes = $bytes . ' bytes';
        }elseif($bytes == 1){
            $bytes = $bytes . ' byte';
        }else{
            $bytes = '0 bytes';
        }
        return $bytes;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setItemId(string $itemId):void{
        $this->itemId->set($itemId);
    }

    public function setName(string $name):void{
        Assert::maxChar($name, 255, 'You have reach the maximum charactor length.');
        $this->name = $name;
    }

    public function setExtention(string $extention):void{
        $this->extention = $extention;
    }
}

?>

