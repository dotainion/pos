<?php
namespace src\module\order\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\order\objects\Order;

class OrderFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Order{
        $order = new Order();
        $order->setId($this->uuid($record['id']));
        $order->setCustomerId($this->uuid($record['customerId']));
        $order->setCompleted((bool)$record['completed']);
        $order->setCanceled((bool)$record['canceled']);
        return $order;
    }
}