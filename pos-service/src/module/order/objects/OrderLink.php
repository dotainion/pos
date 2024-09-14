<?php
namespace src\module\order\objects;

use src\infrastructure\Id;

class OrderLink{
    protected Id $orderId;
    protected Id $referenceId;

    public function __construct(){
        $this->orderId = new Id();
        $this->referenceId = new Id();
    }

    public function orderId():Id{
        return $this->orderId;
    }

    public function referenceId():Id{
        return $this->referenceId;
    }

    public function setOrderId(string $orderId):void{
        $this->orderId->set($orderId);
    }

    public function setReferenceId(string $referenceId):void{
        $this->referenceId->set($referenceId);
    }
}