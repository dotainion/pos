<?php
namespace src\module\category\factory;

use src\module\category\objects\Category;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class CategoryFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Category{
        $item = new Category();
        $item->setId($this->uuid($record['id']));
        $item->setName((string)$record['name']);
        $item->setColor((string)$record['color']);
        $item->setInactive((bool)$record['inactive']);
        $item->setDescription((string)$record['description']);
        return $item;
    }
}