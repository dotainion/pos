<?php
namespace src\module\order\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\order\factory\OrderLinkFactory;
use src\module\order\objects\OrderLink;

class OrderLinkRepository extends Repository{
    protected OrderLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new OrderLinkFactory();
    }
    
    public function create(OrderLink $orderLink):void{
        $this->insert('order')        
            ->add('orderId', $this->uuid($orderLink->orderId()))
            ->add('referenceId', $this->uuid($orderLink->referenceId()));
        $this->execute();
    }
    
    public function deleteOrderLink(OrderLink $orderLink):void{
        $this->insert('order')
            ->where('orderId', $this->uuid($orderLink->orderId()))
            ->where('referenceId', $this->uuid($orderLink->referenceId()));
        $this->execute();
    }
    
    public function listOrders(array $where = []):Collector{
        $this->select('order');

        if(isset($where['orderId'])){
            $this->where('orderId', $this->uuid($where['orderId']));
        }
        if(isset($where['referenceId'])){
            $this->where('referenceId', $this->uuid($where['referenceId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}