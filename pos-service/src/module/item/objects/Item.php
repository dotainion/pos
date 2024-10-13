<?php
namespace src\module\item\objects;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\infrastructure\IObjects;
use src\module\category\objects\Category;
use src\module\image\objects\Image;

class Item  implements IObjects{
    protected Id $id;
    protected Id $categoryId;
    protected string $name;
    protected float $amount;
    protected float $cost;
    protected bool $isTaxable;
    protected bool $favorite;
    protected int $quantity;
    protected string $description;
    protected Collector $bundleItems;
    protected ?Category $category = null;
    protected bool $active;
    protected bool $inclusive;
    protected ?ItemLink $itemLink = null;
    protected ?Image $image = null;

    public function __construct(){
        $this->id = new Id();
        $this->categoryId = new Id();
        $this->bundleItems = new Collector();
    }

    public function id():Id{
        return $this->id;
    }

    public function quantity():int{
        return $this->quantity;
    }

    public function categoryId():Id{
        return $this->categoryId;
    }

    public function category():?Category{
        return $this->category;
    }

    public function name():string{
        return $this->name;
    }

    public function active():bool{
        return $this->active;
    }

    public function inclusive():bool{
        return $this->inclusive;
    }

    public function amount():float{
        return $this->amount;
    }

    public function cost():float{
        return $this->cost;
    }

    public function isTaxable():bool{
        return $this->isTaxable;
    }

    public function description():string{
        return $this->description;
    }

    public function bundleItems():Collector{
        return $this->bundleItems;
    }

    public function favorite():bool{
        return $this->favorite;
    }

    public function itemLink():?ItemLink{
        return $this->itemLink;
    }

    public function image():?Image{
        return $this->image;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setQuantity(int $quantity):void{
        $this->quantity = $quantity;
    }

    public function setCategoryId(string $categoryId):void{
        $this->categoryId->set($categoryId);
    }

    public function setName(string $name):void{
        $this->name = $name;
    }

    public function setAmount(float $amount):void{
        $this->amount = $amount;
    }

    public function setCost(float $cost):void{
        $this->cost = $cost;
    }

    public function setIsTaxable(bool $isTaxable):void{
        $this->isTaxable = $isTaxable;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }

    public function setBundleItems(Collector $bundleItems):void{
        $this->bundleItems = $bundleItems;
    }

    public function setCategory(Category $category):void{
        $this->category = $category;
    }

    public function setFavorite(bool $favorite):void{
        $this->favorite = $favorite;
    }

    public function setActive(bool $active):void{
        $this->active = $active;
    }

    public function setInclusive(bool $inclusive):void{
        $this->inclusive = $inclusive;
    }

    public function setItemLink(ItemLink $itemLink):void{
        //set here to display the price of the bundle item
        $this->itemLink = $itemLink;
    }

    public function setImage(Image $image):void{
        $this->image = $image;
    }
}