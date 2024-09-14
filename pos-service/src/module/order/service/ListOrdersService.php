<?php
namespace src\module\order\service;

use src\infrastructure\Collector;
use src\infrastructure\Service;
use src\module\order\logic\AppendOrderRequirements;
use src\module\order\logic\ListOrders;

class ListOrdersService extends Service{
    protected ListOrders $orders;
    protected AppendOrderRequirements $requirements;

    public function __construct(){
        parent::__construct();
        $this->orders = new ListOrders();
        $this->requirements = new AppendOrderRequirements();
    }
    
    public function process(){
        $collector = $this->orders->listActive();
        $collector->assertHasItem('No orders found.');

        //list items and discount related to order
        $this->requirements->appendRequirements($collector);

        $this->setOutput($collector);
        return $this;
    }
}