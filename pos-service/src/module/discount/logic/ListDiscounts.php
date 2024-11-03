<?php
namespace src\module\discount\logic;

use tools\infrastructure\Collector;
use src\infrastructure\SearchRequest;
use src\module\discount\repository\DiscountRepository;

class ListDiscounts{
    protected DiscountRepository $repo;

    public function __construct(){
        $this->repo = new DiscountRepository();
    }

    public function bySearchRequest(SearchRequest $req):Collector{
        if(!$req->hasArgs()){
            return new Collector();
        }
        return $this->repo->listDiscounts($req->where());
    }

    public function list():Collector{
        return $this->repo->listDiscounts();
    }

    public function byIdArray(array $idArray):Collector{
        if(empty($idArray)){
            return new Collector();
        }
        return $this->repo->listDiscounts([
            'id' => $idArray
        ]);
    }
}