<?php
namespace src\module\order\logic;

use src\infrastructure\Collector;
use src\module\order\repository\OrderRepository;

class ListOrderLinks{
    protected OrderRepository $repo;

    public function __construct(){
        $this->repo = new OrderRepository();
    }

    public function byOrderIdArray(array $orderIdArray):Collector{
        if(empty($orderIdArray)){
            return new Collector();
        }
        return $this->repo->listOrders([
            'orderId' => $orderIdArray
        ]);
    }
}