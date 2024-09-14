<?php
namespace src\module\category\logic;

use src\module\category\objects\Category;
use src\module\category\repository\CategoryRepository;

class SetCategory{
    protected CategoryRepository $repo;

    public function __construct(){
        $this->repo = new CategoryRepository();
    }

    public function set(Category $category):void{
        $collector = $this->repo->listCategories([
            'id' => $category->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($category);
            return;
        }
        $this->repo->create($category);
    }
}