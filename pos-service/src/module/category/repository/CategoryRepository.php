<?php
namespace src\module\category\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\category\factory\CategoryFactory;
use src\module\category\objects\Category;

class CategoryRepository extends Repository{
    protected CategoryFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new CategoryFactory();
    }
    
    public function create(Category $category):void{
        $this->insert('category')        
            ->column('id', $this->uuid($category->id()))
            ->column('name', $category->name())
            ->column('color', $category->color())
            ->column('inactive', $category->inactive())
            ->column('description', $category->description());
        $this->execute();
    }
    
    public function edit(Category $category):void{
        $this->update('category') 
            ->column('name', $category->name())
            ->column('color', $category->color())
            ->column('inactive', $category->inactive())
            ->column('description', $category->description())
            ->where()->eq('id', $this->uuid($category->id()));
        $this->execute();
    }
    
    public function listCategories(array $where = []):Collector{
        $this->select('category');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where()->like('name', $where['name']);
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}