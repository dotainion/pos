<?php
namespace src\module\customer\objects;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Email;
use src\infrastructure\Id;
use src\infrastructure\IObjects;

class Customer  implements IObjects{
    protected Id $id;
    protected string $name;
    protected Email $email;
    protected string $phone;
    protected string $gender;
    protected bool $hide;
    protected DateHelper $date;
    protected Collector $orders;

    public function __construct(){
        $this->id = new Id();
        $this->email = new Email();
        $this->date = new DateHelper();
        $this->orders = new Collector();
    }

    public function id():Id{
        return $this->id;
    }
    
    public function orders():Collector{
        return $this->orders;
    }
    
    public function date():DateHelper{
        return $this->date;
    }
    
    public function name():string{
        return $this->name;
    }

    public function email():string{
        return $this->email->toString();
    }

    public function hide():bool{
        return $this->hide;
    }

    public function phone():string{
        return $this->phone;
    }

    public function gender():?string{
        return $this->gender;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }
    
    public function setName(string $name):void{
        $this->name = $name;
    }

    public function setEmail(string $email):void{
        if(empty($email)){
            return;
        }
        $this->email = new Email($email);
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }

    public function setDate(string $date):void{
        $this->date = new DateHelper($date);
    }
    
    public function setGender(string $gender):void{
        $this->gender = $gender;
    }
    
    public function setPhone(string $phone):void{
        $this->phone = $phone;
    }
    
    public function setOrders(Collector $orders):void{
        $this->orders = $orders;
    }
}