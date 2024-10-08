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
            ->add('id', $this->uuid($category->id()))
            ->add('name', $category->name())
            ->add('color', $category->color())
            ->add('inactive', $category->inactive())
            ->add('description', $category->description());
        $this->execute();
    }
    
    public function edit(Category $category):void{
        $this->update('category') 
            ->set('name', $category->name())
            ->set('color', $category->color())
            ->set('inactive', $category->inactive())
            ->set('description', $category->description())
            ->where('id', $this->uuid($category->id()));
        $this->execute();
    }
    
    public function listCategories(array $where = []):Collector{
        $this->select('category');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->like('name', $where['name']);
        }
        if(isset($where['limit'])){
            $this->limit($where['limit']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}