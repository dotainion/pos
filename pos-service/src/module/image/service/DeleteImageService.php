<?php
namespace src\module\image\service;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\image\logic\DeleteImages;
use src\module\image\logic\ListImage;

class DeleteImageService extends Service{
    protected ListImage $image;
    protected DeleteImages $delete;

    public function __construct(){
        parent::__construct();
        $this->delete = new DeleteImages();
        $this->image = new ListImage();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Image not found.');

        $collector = $this->image->byId(new Id($id));
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Image not found.');
        }
        $image = $collector->first();
        $this->delete->byId($image->id());

        $this->setOutput($image);
        return $this;
    }
}