<?php
namespace src\module\order\logic;

use tools\infrastructure\Collector;
use src\infrastructure\SearchRequest;
use src\module\order\repository\OrderRepository;
use tools\infrastructure\Id;

class ListOrders{
    protected OrderRepository $repo;

    public function __construct(){
        $this->repo = new OrderRepository();
    }

    public function bySearchRequest(SearchRequest $req):Collector{
        if(!$req->hasArgs()){
            return new Collector();
        }
        return $this->repo->listOrders($req->where());
    }

    public function byId(Id $id):Collector{
        return $this->repo->listOrders([
            'id' => $id
        ]);
    }

    public function listActive():Collector{
        return $this->repo->listOrders([
            'completed' => false,
            'canceled' => false
        ]);
    }

    public function listActiveByCustomerIdArray(array $customerIdArray):Collector{
        if(empty($customerIdArray)){
            return new Collector();
        }
        return $this->repo->listOrders([
            'customerId' => $customerIdArray,
            'completed' => false,
            'canceled' => false
        ]);
    }
}