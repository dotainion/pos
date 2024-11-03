<?php
namespace src\module\order\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
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
        $order->setDate((string)$record['date']);
        return $order;
    }
}