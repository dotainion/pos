<?php
namespace src\module\discount\repository;

use src\database\Repository;
use src\infrastructure\Collector;
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
            ->add('id', $this->uuid($discount->id()))
            ->add('name', $discount->name())
            ->add('type', $discount->type())
            ->add('value', $discount->value())
            ->add('isTaxable', $discount->isTaxable())
            ->add('description', $discount->description());
        $this->execute();
    }
    
    public function edit(Discount $discount):void{
        $this->update('discount') 
            ->set('name', $discount->name())
            ->set('type', $discount->type())
            ->set('value', $discount->value())
            ->set('isTaxable', $discount->isTaxable())
            ->set('description', $discount->description())
            ->where('id', $this->uuid($discount->id()));
        $this->execute();
    }
    
    public function listDiscounts(array $where = []):Collector{
        $this->select('discount');

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