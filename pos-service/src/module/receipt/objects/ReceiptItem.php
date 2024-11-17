<?php
namespace src\module\receipt\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IObjects;

class ReceiptItem  implements IObjects{
    protected Id $id;
    protected Id $receiptId;
    protected Id $itemId;
    protected string $name;
    protected float $amount;
    protected int $quantity;
    protected bool $isTaxable;
    protected bool $inclusive;
    protected ?Id $receiptItemParentId = null;

    public function __construct(){
        $this->id = new Id();
        $this->receiptId = new Id();
        $this->itemId = new Id();
    }

    public function id():Id{
        return $this->id;
    }
    
    public function receiptId():Id{
        return $this->receiptId;
    }
    
    public function itemId():Id{
        return $this->itemId;
    }

    public function name():string{
        return $this->name;
    }
    
    public function amount():float{
        return $this->amount;
    }
    
    public function quantity():int{
        return $this->quantity;
    }
    
    public function isTaxable():bool{
        return $this->isTaxable;
    }
    
    public function inclusive():bool{
        return $this->inclusive;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }
    
    public function setReceiptId(string $receiptId):void{
        $this->receiptId->set($receiptId);
    }
    
    public function setItemId(string $itemId):void{
        $this->itemId->set($itemId);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }

    public function setAmount(float $amount):void{
        $this->amount = $amount;
    }

    public function setQuantity(int $quantity):void{
        $this->quantity = $quantity;
    }

    public function setIsTaxable(bool $isTaxable):void{
        $this->isTaxable = $isTaxable;
    }

    public function setInclusive(bool $inclusive):void{
        $this->inclusive = $inclusive;
    }

    public function setReceiptItemParentId(string $receiptItemParentId):void{
        $this->receiptItemParentId = new Id($receiptItemParentId);
    }
}