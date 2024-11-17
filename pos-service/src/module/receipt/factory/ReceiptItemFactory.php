<?php
namespace src\module\receipt\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\receipt\objects\ReceiptItem;
use tools\infrastructure\Id;

class ReceiptItemFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):ReceiptItem{
        $receiptItem = new ReceiptItem();
        $receiptItem->setId($this->uuid($record['id']));
        $receiptItem->setReceiptId($this->uuid($record['receiptId']));
        $receiptItem->setItemId($this->uuid($record['itemId']));
        if($this->isValidUUid($record['receiptItemParentId'] ?? '')){
            $receiptItem->setReceiptItemParentId($this->uuid($record['receiptItemParentId']));
        }
        $receiptItem->setName((string)$record['name']);
        $receiptItem->setAmount((float)$record['amount']);
        $receiptItem->setQuantity((int)$record['quantity']);
        $receiptItem->setIsTaxable((bool)$record['isTaxable']);
        $receiptItem->setInclusive((bool)$record['inclusive']);
        return $receiptItem;
    }
}