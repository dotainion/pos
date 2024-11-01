<?php
namespace src\module\order\repository;

use src\infrastructure\Repository;
use src\infrastructure\Collector;
use src\module\order\factory\OrderFactory;
use src\module\order\objects\Order;

class OrderRepository extends Repository{
    protected OrderFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new OrderFactory();
    }
    
    public function create(Order $order):void{
        $this->insert('order')        
            ->column('id', $this->uuid($order->id()))
            ->column('customerId', $this->uuid($order->customerId()))
            ->column('completed', $order->completed())
            ->column('canceled', $order->canceled())
            ->column('date', $order->date());
        $this->execute();
    }
    
    public function edit(Order $order):void{
        $this->update('order') 
            ->column('customerId', $this->uuid($order->customerId()))
            ->column('completed', $order->completed())
            ->column('canceled', $order->canceled())
            ->column('date', $order->date())
            ->where()->eq('id', $this->uuid($order->id()));
        $this->execute();
    }
    
    public function listOrders(array $where = []):Collector{
        $this->select('order');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['customerId'])){
            $this->where()->eq('customerId', $this->uuid($where['customerId']));
        }
        if(!isset($where['completed']) && !isset($where['desc'])){
            $this->where()->eq('completed',  0);
        }
        if(!isset($where['canceled']) && !isset($where['desc'])){
            $this->where()->eq('canceled', 0);
        }
        if(isset($where['completed'])){
            $this->where()->eq('completed', (int)$where['completed']);
        }
        if(isset($where['canceled'])){
            $this->where()->eq('canceled', (int)$where['canceled']);
        }
        if(isset($where['desc'])){
            $this->orderBy()->desc('date');
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}