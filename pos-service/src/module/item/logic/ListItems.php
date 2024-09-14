<?php
namespace src\module\item\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\item\objects\ItemSearchRequest;
use src\module\item\repository\ItemRepository;

class ListItems{
    protected ItemRepository $repo;

    public function __construct(){
        $this->repo = new ItemRepository();
    }

    public function bySearchRequest(ItemSearchRequest $req):Collector{
        $req->hasId() && $collector = $this->byId($req->id());
        $req->hasItemId() && $collector = $this->byItemId($req->itemId());
        $req->hasCategoryId() && $collector = $this->byCategoryId($req->categoryId());
        $req->hasName() && $collector = $this->byName($req->name());
        if(!$req->hasId() && !$req->hasItemId() && !$req->hasCategoryId() && !$req->hasName()){
            return new Collector();
        }
        return $collector;
    }

    public function byId(Id $id):Collector{
        return $this->repo->listItems([
            'id' => $id,
        ]);
    }

    public function byItemId(Id $itemId):Collector{
        return $this->repo->listItems([
            'itemId' => $itemId,
        ]);
    }

    public function byCategoryId(Id $categoryId):Collector{
        return $this->repo->listItems([
            'categoryId' => $categoryId,
        ]);
    }

    public function byName(string $name):Collector{
        return $this->repo->listItems([
            'name' => $name,
        ]);
    }

    public function byIdArray(array $idArray):Collector{
        if(empty($idArray)){
            return new Collector();
        }
        return $this->repo->listItems([
            'id' => $idArray,
        ]);
    }

    public function byItemIdArray(array $itemIdArray):Collector{
        if(empty($itemIdArray)){
            return new Collector();
        }
        return $this->repo->listItems([
            'itemId' => $itemIdArray,
        ]);
    }
}