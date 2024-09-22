<?php
namespace src\module\order\repository;

use src\database\Repository;
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
            ->add('id', $this->uuid($order->id()))
            ->add('customerId', $this->uuid($order->customerId()))
            ->add('completed', $order->completed())
            ->add('canceled', $order->canceled())
            ->add('draft', $order->draft())
            ->add('date', $order->date());
        $this->execute();
    }
    
    public function edit(Order $order):void{
        $this->update('order') 
            ->set('customerId', $this->uuid($order->customerId()))
            ->set('completed', $order->completed())
            ->set('canceled', $order->canceled())
            ->set('draft', $order->draft())
            ->set('date', $order->date())
            ->where('id', $this->uuid($order->id()));
        $this->execute();
    }
    
    public function listOrders(array $where = []):Collector{
        $this->select('order');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['customerId'])){
            $this->where('customerId', $this->uuid($where['customerId']));
        }
        if(!isset($where['completed']) && !isset($where['desc'])){
            $this->where('completed',  0);
        }
        if(!isset($where['canceled']) && !isset($where['desc'])){
            $this->where('canceled', 0);
        }
        if(isset($where['completed'])){
            $this->where('completed', (int)$where['completed']);
        }
        if(isset($where['canceled'])){
            $this->where('canceled', (int)$where['canceled']);
        }
        if(isset($where['draft'])){
            $this->where('draft', (int)$where['draft']);
        }
        if(isset($where['desc'])){
            $this->orderByDesc('date');
        }
        if(isset($where['limit'])){
            $this->limit($where['limit']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}