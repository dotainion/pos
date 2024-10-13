<?php
namespace src\module\calculation\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\calculation\objects\Amount;

class AmountFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Amount{
        $order = new Amount();
        $order->setId($this->uuid($record['id']));
        $order->setTotalTax((float)$record['totalTax']);
        $order->setTotalAmount((float)$record['totalAmount']);
        $order->setTotalDiscount((float)$record['totalDiscount']);
        $order->setNetTotal((float)$record['netTotal']);
        return $order;
    }
}