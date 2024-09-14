<?php
namespace src\module\customer\logic;

use src\module\customer\objects\Customer;
use src\module\customer\repository\CustomerRepository;

class SetCustomer{
    protected CustomerRepository $repo;

    public function __construct(){
        $this->repo = new CustomerRepository();
    }

    public function set(Customer $customer):void{
        $collector = $this->repo->listCustomers([
            'id' => $customer->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($customer);
            return;
        }
        $this->repo->create($customer);
    }
}