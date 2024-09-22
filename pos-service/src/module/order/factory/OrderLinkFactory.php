<?php
namespace src\module\order\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\order\objects\OrderLink;

class OrderLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):OrderLink{
        $order = new OrderLink();
        $order->setOrderId($this->uuid($record['orderId']));
        $order->setReferenceId($this->uuid($record['referenceId']));
        $order->setQuantity((int)$record['quantity']);
        return $order;
    }
}