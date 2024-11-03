<?php
namespace src\module\item\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\infrastructure\SearchRequest;
use src\module\item\repository\ItemRepository;

class ListItems{
    protected ItemRepository $repo;

    public function __construct(){
        $this->repo = new ItemRepository();
    }

    public function bySearchRequest(SearchRequest $req):Collector{
        if(!$req->hasArgs()){
            return new Collector();
        }
        return $this->repo->listItems($req->where());
    }

    public function byId(Id $id):Collector{
        return $this->repo->listItems([
            'id' => $id,
        ]);
    }

    public function byCategoryId(Id $categoryId):Collector{
        return $this->repo->listItems([
            'categoryId' => $categoryId,
        ]);
    }

    public function byName(string $name):Collector{
        if(empty($name)){
            return new Collector();
        }
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
}