<?php
namespace src\module\order\objects;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\infrastructure\IObjects;

class Order  implements IObjects{
    protected Id $id;
    protected ?Id $customerId = null;
    protected bool $completed;
    protected bool $canceled;
    protected Collector $items;
    protected Collector $discounts;

    public function __construct(){
        $this->id = new Id();
        $this->items = new Collector();
        $this->discounts = new Collector();
    }

    public function id():Id{
        return $this->id;
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

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setCustomerId(?string $customerId):void{
        if($customerId === null){
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
    
    public function setItems(Collector $items):void{
        $this->items = $items;
    }
    
    public function setDiscounts(Collector $discounts):void{
        $this->discounts = $discounts;
    }
}