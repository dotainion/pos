<?php
namespace src\module\discount\objects;

use src\infrastructure\Id;
use src\infrastructure\IObjects;

class Discount  implements IObjects{
    protected Id $id;
    protected string $name;
    protected int $type;
    protected float $value;
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

    public function type():int{
        return $this->type;
    }

    public function value():float{
        return $this->value;
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

    public function setType(int $type):void{
        $this->type = $type;
    }

    public function setValue(float $value):void{
        $this->value = $value;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }
}