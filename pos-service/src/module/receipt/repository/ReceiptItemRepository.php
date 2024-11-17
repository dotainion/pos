<?php
namespace src\module\receipt\repository;

use tools\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\receipt\factory\ReceiptItemFactory;
use src\module\receipt\objects\ReceiptItem;

class ReceiptItemRepository extends Repository{
    protected ReceiptItemFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ReceiptItemFactory();
    }
    
    public function create(ReceiptItem $receiptItem):void{
        $this->insert('receiptItem')        
            ->column('id', $this->uuid($receiptItem->id()))
            ->column('receiptId', $this->uuid($receiptItem->receiptId()))
            ->column('itemId', $this->uuid($receiptItem->itemId()))
            ->column('name', $receiptItem->name())
            ->column('amount', $receiptItem->amount())
            ->column('quantity', $receiptItem->quantity())
            ->column('isTaxable', $receiptItem->isTaxable())
            ->column('inclusive', $receiptItem->inclusive());
        $this->execute();
    }
    
    public function edit(ReceiptItem $receiptItem):void{
        $this->update('receiptItem') 
            ->column('receiptId', $this->uuid($receiptItem->receiptId()))
            ->column('itemId', $this->uuid($receiptItem->itemId()))
            ->column('name', $receiptItem->name())
            ->column('amount', $receiptItem->amount())
            ->column('quantity', $receiptItem->quantity())
            ->column('isTaxable', $receiptItem->isTaxable())
            ->column('inclusive', $receiptItem->inclusive())
            ->where()->eq('id', $this->uuid($receiptItem->id()));
        $this->execute();
    }
    
    public function listCustomers(array $where = []):Collector{
        $this->select('receiptItem');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['itemId'])){
            $this->where()->eq('itemId', $this->uuid($where['itemId']));
        }
        if(isset($where['receiptId'])){
            $this->where()->eq('receiptId', $this->uuid($where['receiptId']));
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}