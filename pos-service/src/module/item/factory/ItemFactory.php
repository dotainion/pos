<?php
namespace src\module\item\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\item\objects\Item;

class ItemFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Item{
        $item = new Item();
        $item->setId($this->uuid($record['id']));
        $item->setCategoryId($this->uuid($record['categoryId']));
        $item->setName((string)$record['name']);
        $item->setAmount((float)$record['amount']);
        $item->setCost((float)$record['cost']);
        $item->setIsTaxable((bool)$record['isTaxable']);
        $item->setQuantity((int)$record['quantity']);
        $item->setFavorite((bool)$record['favorite']);
        $item->setDescription((string)$record['description']);
        $item->setActive((bool)$record['active']);
        $item->setInclusive((bool)$record['inclusive']);
        return $item;
    }
}