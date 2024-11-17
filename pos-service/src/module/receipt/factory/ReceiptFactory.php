<?php
namespace src\module\receipt\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\receipt\objects\Receipt;

class ReceiptFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Receipt{
        $receipt = new Receipt();
        $receipt->setId($this->uuid($record['id']));
        $receipt->setCustomerId((string)$record['customerId']);
        $receipt->setCompleted((bool)$record['completed']);
        $receipt->setCanceled((bool)$record['canceled']);
        $receipt->setDate((string)$record['date']);
        return $receipt;
    }
}