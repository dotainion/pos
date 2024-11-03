<?php
namespace src\module\calculation\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IObjects;

class Amount  implements IObjects{
    protected Id $id;
    protected float $totalTax;
    protected float $totalAmount;
    protected float $totalDiscount;
    protected float $netTotal;

    public function __construct(){
        $this->id = new Id();
    }

    public function id():Id{
        return $this->id;
    }
    
    public function totalTax():float{
        return $this->totalTax;
    }
    
    public function totalAmount():float{
        return $this->totalAmount;
    }
    
    public function totalDiscount():float{
        return $this->totalDiscount;
    }
    
    public function netTotal():float{
        return $this->netTotal;
    }
    
    public function setId(string $id):void{
        $this->id->set($id);
    }
    
    public function setTotalTax(float $totalTax):void{
        $this->totalTax = $totalTax;
    }
    
    public function setTotalAmount(float $totalAmount):void{
        $this->totalAmount = $totalAmount;
    }
    
    public function setTotalDiscount(float $totalDiscount):void{
        $this->totalDiscount = $totalDiscount;
    }
    
    public function setNetTotal(float $netTotal):void{
        $this->netTotal = $netTotal;
    }
}