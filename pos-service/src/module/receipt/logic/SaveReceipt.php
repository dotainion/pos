<?php
namespace src\module\receipt\logic;

use src\module\receipt\objects\Receipt;
use src\module\receipt\repository\ReceiptItemRepository;
use src\module\receipt\repository\ReceiptRepository;

class SaveReceipt{
    protected ReceiptRepository $repo;
    protected ReceiptItemRepository $itemRepo;

    public function __construct(){
        $this->repo = new ReceiptRepository();
        $this->itemRepo = new ReceiptItemRepository();
    }

    public function save(Receipt $receipt):void{
        $this->repo->create($receipt);
        foreach($receipt->items()->list() as $item){
            $this->itemRepo->create($item);
        }
    }
}