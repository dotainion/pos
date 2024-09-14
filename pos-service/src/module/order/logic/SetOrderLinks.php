<?php
namespace src\module\order\logic;

use src\infrastructure\Collector;
use src\module\order\objects\Order;
use src\module\order\repository\OrderRepository;

class SetOrderLinks{
    protected OrderRepository $repo;

    public function __construct(){
        $this->repo = new OrderRepository();
    }

    public function set(Order $order):void{
        $collector = $this->repo->listOrders([
            'id' => $order->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($order);
            return;
        }
        $this->repo->create($order);
    }

    public function masSet(Collector $links):void{
        foreach($links->list() as $link){
            $this->set($link);
        }
    }
}