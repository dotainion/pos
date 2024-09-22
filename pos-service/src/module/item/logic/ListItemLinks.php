<?php
namespace src\module\item\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\item\repository\ItemLinkRepository;

class ListItemLinks{
    protected ItemLinkRepository $repo;

    public function __construct(){
        $this->repo = new ItemLinkRepository();
    }

    public function byParentItemId(Id $parentItemId):Collector{
        return $this->repo->listItemLinks([
            'parentItemId' => $parentItemId,
        ]);
    }

    public function byParentItemIdArray(array $parentItemIdArray):Collector{
        if(empty($parentItemIdArray)){
            return new Collector();
        }
        return $this->repo->listItemLinks([
            'parentItemId' => $parentItemIdArray,
        ]);
    }

    public function byItemIdArray(array $itemIdArray):Collector{
        if(empty($itemIdArray)){
            return new Collector();
        }
        return $this->repo->listItemLinks([
            'itemId' => $itemIdArray,
        ]);
    }
}