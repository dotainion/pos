<?php
namespace src\module\order\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\order\factory\OrderLineFactory;
use src\module\order\objects\OrderLine;

class OrderLineRepository extends Repository{
    protected OrderLineFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new OrderLineFactory();
    }
    
    public function create(OrderLine $orderLine):void{
        $this->insert('orderLine')        
            ->column('id', $this->uuid($orderLine->id()))
            ->column('orderId', $this->uuid($orderLine->orderId()))
            ->column('referenceId', $this->uuid($orderLine->referenceId()))
            ->column('quantity', $orderLine->quantity());
        $this->execute();
    }
    
    public function edit(OrderLine $orderLine):void{
        $this->update('orderLine')
            ->column('quantity', $orderLine->quantity())
            ->column('orderId', $this->uuid($orderLine->orderId()))
            ->column('referenceId', $this->uuid($orderLine->referenceId()))
            ->where()->eq('id', $this->uuid($orderLine->id()));
        $this->execute();
    }
    
    public function deleteOrderLink(OrderLine $orderLine):void{
        $this->delete('orderLine')
            ->where()->eq('id', $this->uuid($orderLine->id()));
        $this->execute();
    }
    
    public function listOrderLinks(array $where = []):Collector{
        $this->select('orderLine');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['orderId'])){
            $this->where()->eq('orderId', $this->uuid($where['orderId']));
        }
        if(isset($where['referenceId'])){
            $this->where()->eq('referenceId', $this->uuid($where['referenceId']));
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}