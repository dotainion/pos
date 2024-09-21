<?php
namespace src\module\order\logic;

use src\infrastructure\Collector;
use src\module\order\repository\OrderLinkRepository;

class ListOrderLinks{
    protected OrderLinkRepository $repo;

    public function __construct(){
        $this->repo = new OrderLinkRepository();
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