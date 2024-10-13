<?php
namespace src\module\order\logic;

use src\infrastructure\Collector;
use src\module\order\repository\OrderLineRepository;

class ListOrderLines{
    protected OrderLineRepository $repo;

    public function __construct(){
        $this->repo = new OrderLineRepository();
    }

    public function byOrderIdArray(array $orderIdArray):Collector{
        if(empty($orderIdArray)){
            return new Collector();
        }
        return $this->repo->listOrderLinks([
            'orderId' => $orderIdArray
        ]);
    }
}