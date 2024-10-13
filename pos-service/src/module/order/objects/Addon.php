<?php
namespace src\module\order\objects;

use src\infrastructure\Id;
use src\infrastructure\IObjects;
use src\module\item\objects\Item;

class Addon implements IObjects{
    protected Id $id;
    protected Id $orderLineId;
    protected Id $itemId;
    protected int $quantity;
    protected ?Item $item = null;

    public function __construct(){
        $this->id = new Id();
        $this->orderLineId = new Id();
        $this->itemId = new Id();
    }

    public function id():Id{
        return $this->id;
    }

    public function orderLineId():Id{
        return $this->orderLineId;
    }

    public function itemId():Id{
        return $this->itemId;
    }

    public function quantity():int{
        return $this->quantity;
    }

    public function item():?Item{
        return $this->item;
    }

    public function type():string{
        return $this->item() ? 'item' : 'discount';
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setOrderLineId(string $orderLineId):void{
        $this->orderLineId->set($orderLineId);
    }

    public function setItemId(string $itemId):void{
        $this->itemId->set($itemId);
    }

    public function setQuantity(int $quantity):void{
        $this->quantity = $quantity;
    }

    public function setItem(Item $item):void{
        $this->item = $item;
    }
}