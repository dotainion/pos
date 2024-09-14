<?php
namespace src\module\category\logic;

use src\infrastructure\Collector;
use src\module\category\repository\CategoryRepository;

class ListCategories{
    protected CategoryRepository $repo;

    public function __construct(){
        $this->repo = new CategoryRepository();
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