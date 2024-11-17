<?php
namespace src\module\receipt\service;

use src\infrastructure\Service;
use src\module\receipt\logic\GenerateReceipt;
use src\module\receipt\logic\SaveReceipt;
use tools\infrastructure\Id;

class CreateReceiptService extends Service{
    protected GenerateReceipt $receipt;
    protected SaveReceipt $save;


    public function __construct(){
        parent::__construct();
        $this->receipt = new GenerateReceipt();
        $this->save = new SaveReceipt();
    }
    
    public function process(string $orderId){

        $receipt = $this->receipt->generate(new Id($orderId));
        $this->save->save($receipt);
        // need to save receipt and its items..
        $this->setOutput($receipt);
        return $this;
    }
}
