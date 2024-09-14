<?php
namespace src\module\discount\service;

use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\discount\logic\SetDiscount;
use src\module\discount\factory\DiscountFactory;

class SetDiscountService extends Service{
    protected SetDiscount $discount;
    protected DiscountFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->discount = new SetDiscount();
        $this->factory = new DiscountFactory();
    }
    
    public function process($id, $name, $type, $value, $description){

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $discount = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'name' => $name,
            'type' => $type,
            'value' => $value,
            'description' => $description,
        ]);

        $this->discount->set($discount);

        $this->setOutput($discount);
        return $this;
    }
}