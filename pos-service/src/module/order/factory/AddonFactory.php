<?php
namespace src\module\order\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\order\objects\Addon;

class AddonFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Addon{
        $order = new Addon();
        $order->setId($this->uuid($record['id']));
        $order->setOrderLineId($this->uuid($record['orderLineId']));
        $order->setItemId($this->uuid($record['itemId']));
        $order->setQuantity((int)$record['quantity']);
        return $order;
    }
}