<?php
namespace src\module\discount\repository;

use tools\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\discount\objects\Discount;
use src\module\discount\factory\DiscountFactory;

class DiscountRepository extends Repository{
    protected DiscountFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new DiscountFactory();
    }
    
    public function create(Discount $discount):void{
        $this->insert('discount')        
            ->column('id', $this->uuid($discount->id()))
            ->column('name', $discount->name())
            ->column('type', $discount->type())
            ->column('value', $discount->value())
            ->column('isTaxable', $discount->isTaxable())
            ->column('description', $discount->description());
        $this->execute();
    }
    
    public function edit(Discount $discount):void{
        $this->update('discount') 
            ->column('name', $discount->name())
            ->column('type', $discount->type())
            ->column('value', $discount->value())
            ->column('isTaxable', $discount->isTaxable())
            ->column('description', $discount->description())
            ->where()->eq('id', $this->uuid($discount->id()));
        $this->execute();
    }
    
    public function listDiscounts(array $where = []):Collector{
        $this->select('discount');

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