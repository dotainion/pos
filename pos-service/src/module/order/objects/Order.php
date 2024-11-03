<?php
namespace src\module\order\objects;

use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IObjects;
use src\module\calculation\objects\Amount;
use src\module\customer\objects\Customer;

class Order  implements IObjects{
    protected Id $id;
    protected ?Id $customerId = null;
    protected bool $completed;
    protected bool $canceled;
    protected ?Customer $customer = null;
    protected Collector $items;
    protected Collector $discounts;
    protected DateHelper $date;
    protected Amount $amount;

    public function __construct(){
        $this->id = new Id();
        $this->items = new Collector();
        $this->discounts = new Collector();
        $this->date = new DateHelper();
    }

    public function id():Id{
        return $this->id;
    }

    public function date():DateHelper{
        return $this->date;
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

    public function amount():Amount{
        return $this->amount;
    }

    public function customer():?Customer{
        return $this->customer;
    }

    public function items():Collector{
        return $this->items;
    }

    public function discounts():Collector{
        return $this->discounts;
    }

    public function orderNumber():string{
        return end(explode('-', $this->id()->toString()));
    }

    public function status():string{
        if($this->canceled()){
            return 'Canceled';
        }
        if($this->completed()){
            return 'Completed';
        }
        return 'Draft';
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

    public function setDate(string $date):void{
        $this->date->set($date);
    }

    public function setCustomer(Customer $customer):void{
        $this->customer = $customer;
    }
    
    public function setItems(Collector $items):void{
        $this->items = $items;
    }
    
    public function setDiscounts(Collector $discounts):void{
        $this->discounts = $discounts;
    }

    public function setAmount(Amount $amount):void{
        $this->amount = $amount;
    }
}