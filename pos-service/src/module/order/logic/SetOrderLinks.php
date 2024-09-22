<?php
namespace src\module\order\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\order\objects\OrderLink;
use src\module\order\repository\OrderLinkRepository;

class SetOrderLinks{
    protected OrderLinkRepository $repo;

    public function __construct(){
        $this->repo = new OrderLinkRepository();
    }

    public function create(OrderLink $orderLink):void{
        $collector = $this->repo->listOrderLinks([
            'orderId' => $orderLink->orderId(),
            'referenceId' => $orderLink->referenceId()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($orderLink);
            return;
        }
        $this->repo->create($orderLink);
    }

    public function delete(OrderLink $orderLink):void{
        $collector = $this->repo->listOrderLinks([
            'orderId' => $orderLink->orderId(),
            'referenceId' => $orderLink->referenceId()
        ]);
        if(!$collector->hasItem()){
            return;
        }
        $this->repo->deleteOrderLink($orderLink);
    }

    public function massControlCreate(Collector $links, Id $orderId):void{
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
            $this->create($link);
        }
    }
}