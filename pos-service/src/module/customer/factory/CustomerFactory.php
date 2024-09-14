<?php
namespace src\module\customer\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\customer\objects\Customer;

class CustomerFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Customer{
        $item = new Customer();
        $item->setId($this->uuid($record['id']));
        $item->setName((string)$record['name']);
        $item->setEmail((string)$record['email']);
        $item->setPhone((string)$record['phone']);
        $item->setGender((string)$record['gender']);
        $item->setDate((string)$record['date']);
        $item->setHide((bool)$record['hide']);
        return $item;
    }
}