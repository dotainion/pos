<?php
namespace src\module\order\logic;

use src\module\discount\objects\TypeValue;
use src\module\order\objects\Order;

class CalculateOrder{
    protected Order $order;

    public function __construct(Order $order){
        $this->order = $order;
    }

    public function totalDiscountsAmount():float{
        $total = 0;
        foreach($this->order->discounts()->list() as $discount){
            if($discount->type() === TypeValue::DollarAmountType){
                $total = $total + $discount->value();
            }else if($discount->type() === TypeValue::PercentageType){
                $total = $total + (($discount->value() / 100) * $this->totalItemsAmount());
            }
        }
        return $total;
    }

    public function totalItemsAmount():float{
        $total = 0;
        foreach($this->order->items()->list() as $item){
            $total = $total + $item->amount();
        }
        return $total;
    }
}