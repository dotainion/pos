<?php
namespace src\module\item\objects;

use src\infrastructure\Id;
use src\infrastructure\IObjects;

class ItemLink implements IObjects{
    protected Id $parentItemId;
    protected Id $itemId;
    protected int $amount;
    protected bool $optional;
    protected bool $priceIncluded;
    protected bool $taxInclusive;
    protected bool $increaseQuantity;

    public function __construct(){
        $this->parentItemId = new Id();
        $this->itemId = new Id();
    }

    public function id():Id{
        return $this->itemId();
    }

    public function parentItemId():Id{
        return $this->parentItemId;
    }

    public function optional():bool{
        return $this->optional;
    }

    public function priceIncluded():bool{
        return $this->priceIncluded;
    }

    public function taxInclusive():bool{
        return $this->taxInclusive;
    }

    public function itemId():Id{
        return $this->itemId;
    }

    public function amount():?int{
        return $this->amount;
    }

    public function increaseQuantity():bool{
        return $this->increaseQuantity;
    }

    public function setParentItemId(string $parentItemId):void{
        $this->parentItemId->set($parentItemId);
    }

    public function setItemId(string $itemId):void{
        $this->itemId->set($itemId);
    }

    public function setAmount(int $amount):void{
        $this->amount = $amount;
    }

    public function setOptional(bool $optional):void{
        $this->optional = $optional;
    }

    public function setPriceIncluded(bool $priceIncluded):void{
        $this->priceIncluded = $priceIncluded;
    }

    public function setTaxInclusive(bool $taxInclusive):void{
        $this->taxInclusive = $taxInclusive;
    }

    public function setIncreaseQuantity(bool $increaseQuantity):void{
        $this->increaseQuantity = $increaseQuantity;
    }
}