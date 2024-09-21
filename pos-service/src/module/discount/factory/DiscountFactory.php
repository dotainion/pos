<?php
namespace src\module\discount\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\discount\objects\Discount;

class DiscountFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Discount{
        $item = new Discount();
        $item->setId($this->uuid($record['id']));
        $item->setName((string)$record['name']);
        $item->setType((int)$record['type']);
        $item->setValue((float)$record['value']);
        $item->setIsTaxable((bool)$record['isTaxable']);
        $item->setDescription((string)$record['description']);
        return $item;
    }
}