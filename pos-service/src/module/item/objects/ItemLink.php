<?php
namespace src\module\item\objects;

use src\infrastructure\Id;

class ItemLink{
    protected Id $parentItemId;
    protected Id $itemId;

    public function __construct(){
        $this->parentItemId = new Id();
        $this->itemId = new Id();
    }

    public function parentItemId():Id{
        return $this->parentItemId;
    }

    public function itemId():Id{
        return $this->itemId;
    }

    public function setParentItemId(string $parentItemId):void{
        $this->parentItemId->set($parentItemId);
    }

    public function setItemId(string $itemId):void{
        $this->itemId->set($itemId);
    }
}