<?php
namespace src\module\category\logic;

use src\infrastructure\SearchRequest;
use src\module\category\repository\CategoryRepository;
use tools\infrastructure\Collector;

class ListCategories{
    protected CategoryRepository $repo;

    public function __construct(){
        $this->repo = new CategoryRepository();
    }

    public function bySearchRequest(SearchRequest $req):Collector{
        if(!$req->hasArgs()){
            return new Collector();
        }
        return $this->repo->listCategories($req->where());
    }

    public function list():Collector{
        return $this->repo->listCategories();
    }

    public function byIdArray(array $idArray):Collector{
        if(empty($idArray)){
            return new Collector();
        }
        return $this->repo->listCategories([
            'id' => $idArray
        ]);
    }
}