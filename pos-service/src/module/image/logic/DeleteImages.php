<?php
namespace src\module\image\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\Env;
use src\infrastructure\Id;
use src\module\image\objects\Image;
use src\module\image\repository\ImageRepository;

class DeleteImages{
    protected ListImage $images;
    protected ImageRepository $repo;

    public function __construct(){
        $this->repo = new ImageRepository();
        $this->images = new ListImage();
    }

    public function byId(Id $id):void{
        $collector = $this->images->byId($id);
        $this->deleteFile($collector->first());
        $this->repo->deleteImages($id);
    }

    public function deleteFile(Image $image):bool{
        if (!unlink((new Env())->rootDir() . '/pos-files/'.$image->fqFileName())){ 
            throw new InvalidArgumentException('Unable to delete a file.');
        } 
        return true;
    }

    public function deleteFileCollection(Collector $collector):void{
        foreach($collector->list() as $image){
            $this->byId($image->id());
        }
    }
}