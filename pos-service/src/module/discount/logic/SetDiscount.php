<?php
namespace src\module\discount\logic;

use src\module\discount\objects\Discount;
use src\module\discount\repository\DiscountRepository;

class SetDiscount{
    protected DiscountRepository $repo;

    public function __construct(){
        $this->repo = new DiscountRepository();
    }

    public function set(Discount $discount):void{
        $collector = $this->repo->listDiscounts([
            'id' => $discount->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($discount);
            return;
        }
        $this->repo->create($discount);
    }
}