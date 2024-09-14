<?php
namespace src\module\item\objects;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\infrastructure\IObjects;

class Item  implements IObjects{
    protected Id $id;
    protected Id $categoryId;
    protected ?Id $itemId = null;
    protected string $name;
    protected float $amount;
    protected bool $isTaxable;
    protected int $quantity;
    protected string $description;
    protected Collector $bundleItems;

    public function __construct(){
        $this->id = new Id();
        $this->categoryId = new Id();
        $this->bundleItems = new Collector();
    }

    public function id():Id{
        return $this->id;
    }

    public function quantity():int{
        return $this->quantity;
    }

    public function categoryId():Id{
        return $this->categoryId;
    }

    public function itemId():?Id{
        return $this->itemId;
    }

    public function name():string{
        return $this->name;
    }

    public function amount():float{
        return $this->amount;
    }

    public function isTaxable():bool{
        return $this->isTaxable;
    }

    public function description():string{
        return $this->description;
    }

    public function bundleItems():Collector{
        return $this->bundleItems;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setQuantity(int $quantity):void{
        $this->quantity = $quantity;
    }

    public function setCategoryId(string $categoryId):void{
        $this->categoryId->set($categoryId);
    }

    public function setItemId(?string $itemId):void{
        if($itemId === null){
            return;
        }
        $this->itemId = new Id($itemId);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }

    public function setAmount(float $amount):void{
        $this->amount = $amount;
    }

    public function setIsTaxable(bool $isTaxable):void{
        $this->isTaxable = $isTaxable;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }

    public function setBundleItems(Collector $bundleItems):void{
        $this->bundleItems = $bundleItems;
    }
}