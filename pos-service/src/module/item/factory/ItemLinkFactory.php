<?php
namespace src\module\item\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\item\objects\ItemLink;

class ItemLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):ItemLink{
        $itemLink = new ItemLink();
        $itemLink->setParentItemId($this->uuid($record['parentItemId']));
        $itemLink->setItemId($this->uuid($record['itemId']));
        $itemLink->setAmount((float)$record['amount']);
        $itemLink->setOptional((bool)$record['optional']);
        $itemLink->setPriceIncluded((bool)$record['priceIncluded']);
        $itemLink->setTaxInclusive((bool)$record['taxInclusive']);
        $itemLink->setIncreaseQuantity((bool)$record['increaseQuantity']);
        return $itemLink;
    }
}