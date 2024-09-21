<?php
namespace src\module\item\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\item\factory\ItemFactory;
use src\module\item\objects\Item;

class ItemRepository extends Repository{
    protected ItemFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ItemFactory();
    }
    
    public function create(Item $item):void{
        $this->insert('item')        
            ->add('id', $this->uuid($item->id()))
            ->add('name', $item->name())
            ->add('categoryId', $this->uuid($item->categoryId()))
            ->add('amount', $item->amount())
            ->add('cost', $item->cost())
            ->add('favorite', $item->favorite())
            ->add('isTaxable', $item->isTaxable())
            ->add('quantity', $item->quantity())
            ->add('description', $item->description());
        $this->execute();
    }
    
    public function edit(Item $item):void{
        $this->update('item') 
            ->set('name', $item->name())
            ->set('categoryId', $this->uuid($item->categoryId()))
            ->set('amount', $item->amount())
            ->set('cost', $item->cost())
            ->set('favorite', $item->favorite())
            ->set('isTaxable', $item->isTaxable())
            ->set('quantity', $item->quantity())
            ->set('description', $item->description())
            ->where('id', $this->uuid($item->id()));
        $this->execute();
    }
    
    public function listItems(array $where = []):Collector{
        $this->select('item');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->like('name', $where['name']);
        }
        if(isset($where['favorite'])){
            $this->where('favorite', (int)$where['favorite']);
        }
        if(isset($where['categoryId'])){
            $this->where('categoryId', $this->uuid($where['categoryId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}