<?php
namespace src\module\image\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\image\repository\ImageRepository;

class ListImage{
    protected ImageRepository $repo;

    public function __construct(){
        $this->repo = new ImageRepository();
    }

    public function byId(Id $itemId):Collector{
        return $this->repo->list([
            'id' => $itemId,
        ]);
    }

    public function byItemIdArray(array $itemIdArray):Collector{
        if(empty($itemIdArray)){
            return new Collector();
        }
        return $this->repo->list([
            'itemId' => $itemIdArray,
        ]);
    }
}