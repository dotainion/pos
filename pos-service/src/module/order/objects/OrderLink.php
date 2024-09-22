<?php
namespace src\module\order\objects;

use src\infrastructure\Id;

class OrderLink{
    protected Id $orderId;
    protected Id $referenceId;
    protected int $quantity;

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

    public function quantity():int{
        return $this->quantity;
    }

    public function setOrderId(string $orderId):void{
        $this->orderId->set($orderId);
    }

    public function setReferenceId(string $referenceId):void{
        $this->referenceId->set($referenceId);
    }

    public function setQuantity(int $quantity):void{
        $this->quantity = $quantity;
    }
}