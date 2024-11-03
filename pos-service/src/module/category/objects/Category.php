<?php
namespace src\module\category\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IObjects;

class Category  implements IObjects{
    protected Id $id;
    protected string $name;
    protected bool $inactive;
    protected string $color;
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

    public function inactive():bool{
        return $this->inactive;
    }

    public function color():string{
        return $this->color;
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

    public function setInactive(float $inactive):void{
        $this->inactive = $inactive;
    }

    public function setColor(string $color):void{
        $this->color = $color;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }
}