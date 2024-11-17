<?php
namespace src\module\receipt\repository;

use tools\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\receipt\factory\ReceiptFactory;
use src\module\receipt\objects\Receipt;

class ReceiptRepository extends Repository{
    protected ReceiptFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ReceiptFactory();
    }
    
    public function create(Receipt $receipt):void{
        $this->insert('receipt')        
            ->column('id', $this->uuid($receipt->id()))
            ->column('customerId', $receipt->customerId())
            ->column('completed', $receipt->completed())
            ->column('canceled', $receipt->canceled())
            ->column('date', $receipt->date());
        $this->execute();
    }
    
    public function edit(Receipt $receipt):void{
        $this->update('receipt') 
            ->column('customerId', $receipt->customerId())
            ->column('completed', $receipt->completed())
            ->column('canceled', $receipt->canceled())
            ->column('date', $receipt->date())
            ->where()->eq('id', $this->uuid($receipt->id()));
        $this->execute();
    }
    
    public function listCustomers(array $where = []):Collector{
        $this->select('receipt');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['customerId'])){
            $this->where()->eq('customerId', $this->uuid($where['customerId']));
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}