<?php
namespace src\module\item\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\item\objects\ItemLink;

class ItemLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):ItemLink{
        $itemLink = new ItemLink();
        $itemLink->setParentItemId($this->uuid($record['parentItemId']));
        $itemLink->setItemId($this->uuid($record['itemId']));
        return $itemLink;
    }
}