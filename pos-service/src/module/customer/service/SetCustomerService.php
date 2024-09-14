<?php
namespace src\module\customer\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\customer\factory\CustomerFactory;
use src\module\customer\logic\SetCustomer;

class SetCustomerService extends Service{
    protected SetCustomer $customer;
    protected CustomerFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->customer = new SetCustomer();
        $this->factory = new CustomerFactory();
    }
    
    public function process($id, $name, $email, $phone, $gender, $date, $hide){

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $customer = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'gender' => $gender,
            'date' => $date,
            'hide' => $hide,
        ]);

        $this->customer->set($customer);

        $this->setOutput($customer);
        return $this;
    }
}