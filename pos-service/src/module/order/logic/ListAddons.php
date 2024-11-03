<?php
namespace src\module\order\logic;

use tools\infrastructure\Collector;
use src\module\order\repository\AddonRepository;

class ListAddons{
    protected AddonRepository $repo;

    public function __construct(){
        $this->repo = new AddonRepository();
    }

    public function byOrderLineIdArray(array $orderLineIdArray):Collector{
        if(empty($orderLineIdArray)){
            return new Collector();
        }
        return $this->repo->listAddons([
            'orderLineId' => $orderLineIdArray
        ]);
    }
}