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
            ->add('id', $this->uuid($customer->id()))
            ->add('name', $customer->name())
            ->add('email', $customer->email())
            ->add('phone', $customer->phone())
            ->add('gender', $customer->gender())
            ->add('date', $customer->date())
            ->add('hide', $customer->hide());
        $this->execute();
    }
    
    public function edit(Customer $customer):void{
        $this->update('customer') 
            ->set('name', $customer->name())
            ->set('email', $customer->email())
            ->set('phone', $customer->phone())
            ->set('gender', $customer->gender())
            ->set('date', $customer->date())
            ->set('hide', $customer->hide())
            ->where('id', $this->uuid($customer->id()));
        $this->execute();
    }
    
    public function listCustomers(array $where = []):Collector{
        $this->select('customer');

        if(isset($where['id'])){
            $this->where('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->like('name', $where['name']);
        }
        if(isset($where['email'])){
            $this->like('email', $where['email']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}