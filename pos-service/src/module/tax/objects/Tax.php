<?php
namespace src\module\tax\objects;

use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IObjects;
use src\module\category\objects\Category;

class Tax implements IObjects{
    protected Id $id;
    protected string $name;
    protected ?Id $categoryId = null;
    protected float $value;
    protected DateHelper $date;
    protected string $description;
    protected ?Category $category = null;
    protected bool $active;
    protected bool $delete = false;

    public function __construct(){
        $this->id = new Id();
        $this->date = new DateHelper();
    }

    public function id():Id{
        return $this->id;
    }
    
    public function name():string{
        return $this->name;
    }
    
    public function delete():bool{
        return $this->delete;
    }
    
    public function categoryId():?Id{
        return $this->categoryId;
    }

    public function active():bool{
        return $this->active;
    }

    public function value():float{
        return $this->value;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function description():string{
        return $this->description;
    }

    public function category():?Category{
        return $this->category;
    }

    public function status():string{
        return $this->active() ? 'Active' : 'Inactive';
    }
    
    public function setId(string $id):void{
        $this->id->set($id);
    }
    
    public function setName(string $name):void{
        $this->name = $name;
    }
    
    public function setDelete(bool $delete):void{
        $this->delete = $delete;
    }
    
    public function setCategoryId(?string $categoryId):void{
        if($categoryId === null){
            return;
        }
        $this->categoryId = new Id($categoryId);
    }

    public function setValue(float $value):void{
        $this->value = $value;
    }

    public function setActive(bool $active):void{
        $this->active = $active;
    }

    public function setDate(string $date):void{
        $this->date->set($date);
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }

    public function setCategory(Category $category):void{
        $this->category = $category;
    }
}