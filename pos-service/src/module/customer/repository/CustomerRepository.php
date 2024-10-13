<?php
namespace src\module\customer\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\customer\factory\CustomerFactory;
use src\module\customer\objects\Customer;

class CustomerRepository extends Repository{
    protected CustomerFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new CustomerFactory();
    }
    
    public function create(Customer $customer):void{
        $this->insert('customer')        
            ->column('id', $this->uuid($customer->id()))
            ->column('name', $customer->name())
            ->column('email', $customer->email())
            ->column('phone', $customer->phone())
            ->column('gender', $customer->gender())
            ->column('date', $customer->date())
            ->column('hide', $customer->hide());
        $this->execute();
    }
    
    public function edit(Customer $customer):void{
        $this->update('customer') 
            ->column('name', $customer->name())
            ->column('email', $customer->email())
            ->column('phone', $customer->phone())
            ->column('gender', $customer->gender())
            ->column('date', $customer->date())
            ->column('hide', $customer->hide())
            ->where()->eq('id', $this->uuid($customer->id()));
        $this->execute();
    }
    
    public function listCustomers(array $where = []):Collector{
        $this->select('customer');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where()->like('name', $where['name']);
        }
        if(isset($where['email'])){
            $this->where()->like('email', $where['email']);
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}