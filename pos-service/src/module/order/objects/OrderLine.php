<?php
namespace src\module\order\objects;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use tools\infrastructure\IObjects;
use src\module\discount\objects\Discount;
use src\module\item\objects\Item;

class OrderLine implements IObjects{
    protected Id $id;
    protected Id $orderId;
    protected Id $referenceId;
    protected int $quantity;
    protected ?Item $item = null;
    protected ?Discount $discount = null;
    protected Collector $addons;

    public function __construct(){
        $this->id = new Id();
        $this->orderId = new Id();
        $this->referenceId = new Id();
        $this->addons = new Collector();
    }

    public function id():Id{
        return $this->id;
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

    public function item():?Item{
        return $this->item;
    }

    public function discount():?Discount{
        return $this->discount;
    }

    public function type():string{
        return $this->item() ? 'item' : 'discount';
    }

    public function addons():Collector{
        return $this->addons;
    }

    public function setId(string $id):void{
        $this->id->set($id);
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

    public function setItem(Item $item):void{
        $this->item = $item;
    }

    public function setDiscount(Discount $discount):void{
        $this->discount = $discount;
    }

    public function setAddons(Collector $addons):void{
        $this->addons = $addons;
    }
}