<?php
namespace src\module\image\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\image\objects\Image;

class ImageFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Image{
        $image = new Image();
        $image->setId($this->uuid($record['id']));
        $image->setItemId($this->uuid($record['itemId']));
        $image->setName($record['name']);
        $image->setExtention($record['extention']);
        return $image;
    }
}