<?php
namespace src\module\category\objects;

use src\infrastructure\Id;
use src\infrastructure\IObjects;

class Category  implements IObjects{
    protected Id $id;
    protected string $name;
    protected float $amount;
    protected string $description;

    public function __construct(){
        $this->id = new Id();
    }

    public function id():Id{
        return $this->id;
    }

    public function name():string{
        return $this->name;
    }

    public function amount():float{
        return $this->amount;
    }

    public function description():string{
        return $this->description;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }

    public function setAmount(float $amount):void{
        $this->amount = $amount;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }
}