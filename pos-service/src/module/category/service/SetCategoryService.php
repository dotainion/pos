<?php
namespace src\module\category\service;

use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\category\factory\CategoryFactory;
use src\module\category\logic\SetCategory;

class SetCategoryService extends Service{
    protected SetCategory $category;
    protected CategoryFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->category = new SetCategory();
        $this->factory = new CategoryFactory();
    }
    
    public function process($id, $name, $amount, $description){

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $category = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'name' => $name,
            'amount' => $amount,
            'description' => $description,
        ]);

        $this->category->set($category);

        $this->setOutput($category);
        return $this;
    }
}