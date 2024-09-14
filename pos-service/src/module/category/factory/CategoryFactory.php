<?php
namespace src\module\category\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\category\objects\Category;

class CategoryFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Category{
        $item = new Category();
        $item->setId($this->uuid($record['id']));
        $item->setName((string)$record['name']);
        $item->setAmount((float)$record['amount']);
        $item->setDescription((string)$record['description']);
        return $item;
    }
}