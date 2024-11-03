<?php
namespace src\module\tax\logic;

use tools\infrastructure\Collector;
use src\module\category\logic\ListCategories;
use src\module\tax\repository\TaxRepository;

class AppendTaxRequirements{
    protected TaxRepository $repo;
    protected ListCategories $categories;

    public function __construct(){
        $this->repo = new TaxRepository();
        $this->categories = new ListCategories();
    }

    public function appendRequirements(Collector &$taxes):void{
        $collector = $this->categories->byIdArray(array_filter($taxes->attrArray('categoryId'), fn($id)=>$id !== null));

        foreach($taxes->list() as $tax){
            foreach($collector->list() as $category){
                if($tax->categoryId() !== null && $tax->categoryId()->toString() === $category->id()->toString()){
                    $tax->setCategory($category);
                    break;
                }
            } 
        }
    }
}