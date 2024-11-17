<?php
namespace src\module\receipt\objects;

use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IObjects;

class Receipt  implements IObjects{
    protected Id $id;
    protected ?Id $customerId;
    protected bool $completed;
    protected bool $canceled;
    protected DateHelper $date;
    protected Collector $items;

    public function __construct(){
        $this->id = new Id();
        $this->date = new DateHelper();
        $this->items = new Collector();
    }

    public function id():Id{
        return $this->id;
    }

    public function items():Collector{
        return $this->items;
    }
    
    public function customerId():?Id{
        return $this->customerId;
    }
    
    public function completed():bool{
        return $this->completed;
    }

    public function canceled():bool{
        return $this->canceled;
    }
    
    public function date():DateHelper{
        return $this->date;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }
    
    public function setCustomerId(?string $customerId):void{
        if(!(new Id())->isValid($customerId)){
            return;
        }
        $this->customerId = new Id($customerId);
    }

    public function setCompleted(bool $completed):void{
        $this->completed = $completed;
    }

    public function setCanceled(bool $canceled):void{
        $this->canceled = $canceled;
    }

    public function setDate(string $date):void{
        $this->date = new DateHelper($date);
    }
}