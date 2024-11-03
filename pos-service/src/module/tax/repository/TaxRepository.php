<?php
namespace src\module\tax\repository;

use tools\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\tax\factory\TaxFactory;
use src\module\tax\objects\Tax;

class TaxRepository extends Repository{
    protected TaxFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new TaxFactory();
    }
    
    public function create(Tax $tax):void{
        $this->insert('tax')        
            ->column('id', $this->uuid($tax->id()))
            ->column('name', $tax->name())
            ->column('categoryId', $this->uuid($tax->categoryId()))
            ->column('value', $tax->value())
            ->column('date', $tax->date())
            ->column('active', $tax->active())
            ->column('description', $tax->description());
        $this->execute();
    }
    
    public function edit(Tax $tax):void{
        $this->update('tax') 
            ->column('name', $tax->name())
            ->column('categoryId', $this->uuid($tax->categoryId()))
            ->column('value', $tax->value())
            //->set('date', $tax->date())
            ->column('active', $tax->active())
            ->column('description', $tax->description())
            ->where()->eq('id', $this->uuid($tax->id()));
        $this->execute();
    }
    
    public function deleteTax(Tax $tax):void{
        $this->delete('tax')
            ->where()->eq('id', $this->uuid($tax->id()));
        $this->execute();
    }
    
    public function listTaxes(array $where = []):Collector{
        $this->select('tax');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['categoryId'])){
            $this->where()->eq('categoryId', $this->uuid($where['customerId']));
        }
        if(isset($where['active'])){
            $this->where()->eq('active', (int)$where['active']);
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}