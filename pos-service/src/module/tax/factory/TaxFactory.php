<?php
namespace src\module\tax\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\tax\objects\Tax;

class TaxFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Tax{
        $tax = new Tax();
        $tax->setId($this->uuid($record['id']));
        $tax->setName((string)$record['name']);
        $tax->setCategoryId($this->uuid($record['categoryId']));
        $tax->setValue((float)$record['value']);
        $tax->setDate((string)$record['date']);
        $tax->setActive((bool)$record['active']);
        $tax->setDescription((string)$record['description']);
        $tax->setDelete($record['delete'] ?? false);
        return $tax;
    }
}