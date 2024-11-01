<?php
namespace src\module\item\repository;

use src\infrastructure\Repository;
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
            ->column('id', $this->uuid($item->id()))
            ->column('name', $item->name())
            ->column('categoryId', $this->uuid($item->categoryId()))
            ->column('amount', $item->amount())
            ->column('cost', $item->cost())
            ->column('favorite', $item->favorite())
            ->column('isTaxable', $item->isTaxable())
            ->column('quantity', $item->quantity())
            ->column('description', $item->description())
            ->column('active', $item->active())
            ->column('inclusive', $item->inclusive());
        $this->execute();
    }
    
    public function edit(Item $item):void{
        $this->update('item') 
            ->column('name', $item->name())
            ->column('categoryId', $this->uuid($item->categoryId()))
            ->column('amount', $item->amount())
            ->column('cost', $item->cost())
            ->column('favorite', $item->favorite())
            ->column('isTaxable', $item->isTaxable())
            ->column('quantity', $item->quantity())
            ->column('description', $item->description())
            ->column('active', $item->active())
            ->column('inclusive', $item->inclusive())
            ->where()->eq('id', $this->uuid($item->id()));
        $this->execute();
    }
    
    public function listItems(array $where = []):Collector{
        $this->select('item');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where()->like('name', $where['name']);
        }
        if(isset($where['active'])){
            $this->where()->eq('active', (int)$where['active']);
        }
        if(isset($where['inclusive'])){
            $this->where()->eq('inclusive', (int)$where['inclusive']);
        }
        if(isset($where['favorite'])){
            $this->where()->eq('favorite', (int)$where['favorite']);
        }
        if(isset($where['categoryId'])){
            $this->where()->eq('categoryId', $this->uuid($where['categoryId']));
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}