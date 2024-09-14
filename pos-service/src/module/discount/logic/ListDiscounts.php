<?php
namespace src\module\discount\logic;

use src\infrastructure\Collector;
use src\module\discount\repository\DiscountRepository;

class ListDiscounts{
    protected DiscountRepository $repo;

    public function __construct(){
        $this->repo = new DiscountRepository();
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