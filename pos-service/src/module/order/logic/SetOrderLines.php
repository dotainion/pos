<?php
namespace src\module\order\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\order\objects\OrderLine;
use src\module\order\repository\OrderLineRepository;

class SetOrderLines{
    protected OrderLineRepository $repo;

    public function __construct(){
        $this->repo = new OrderLineRepository();
    }

    public function set(OrderLine $orderLine):void{
        $collector = $this->repo->listOrderLinks([
            'id' => $orderLine->id(),
        ]);
        if($collector->hasItem()){
            $this->repo->edit($orderLine);
            return;
        }
        $this->repo->create($orderLine);
    }

    public function delete(OrderLine $orderLine):void{
        $collector = $this->repo->listOrderLinks([
            'id' => $orderLine->id(),
        ]);
        if(!$collector->hasItem()){
            return;
        }
        $this->repo->deleteOrderLink($orderLine);
    }

    public function massSet(Collector $links, Id $orderId):void{
        if($links->isEmpty()){
            return;
        }
        $collector = $this->repo->listOrderLinks([
            'orderId' => $orderId
        ]);
        $collectorToDelete = new Collector();
        foreach($collector->list() as $exist){
            $found = false;
            foreach($links->list() as $link){
                if($exist->referenceId()->toString() === $link->referenceId()->toString()){
                    $found = true;
                }
            }
            !$found && $collectorToDelete->add($exist);
        }
        foreach($collectorToDelete->list() as $deleteLink){
            $this->delete($deleteLink);
        }
        foreach($links->list() as $link){
            $this->set($link);
        }
    }
}