<?php
namespace src\module\tax\logic;

use src\module\discount\objects\TypeValue;
use src\module\order\objects\Order;

class TaxCalculator{
    protected float $taxRate;
    protected bool $isInclusive;

    public function __construct($taxRate, $isInclusive){
        $this->taxRate = $taxRate;
        $this->isInclusive = $isInclusive;
    }

    public function calculateTotal(Order $order){
        $totalAmount = 0;
        $totalDiscount = 0;

        // Calculate total amount of items
        foreach($order->items()->list() as $item){
            if(!$item->exemptTax()){
                $totalAmount += ($item->amount() * $item->quantity());
            }
        }

        // Calculate total discounts
        foreach($order->discounts()->list() as $discount){
            if ($discount->isTaxable()) {
                $discountValue = $discount->value();
                if($discount->type() === TypeValue::DollarAmountType){
                    $totalDiscount += $discountValue;
                }elseif($discount->type() === TypeValue::PercentageType){
                    $totalDiscount += ($totalAmount * ($discountValue / 100));
                }
            }
        }

        // Calculate final amount after discounts
        $taxableAmount = max($totalAmount - $totalDiscount, 0);

        // Calculate tax
        $totalTax = 0;
        if($this->isInclusive) {
            $totalTax = $taxableAmount - ($taxableAmount / (1 + $this->taxRate / 100));
        }else{
            $totalTax = $taxableAmount * ($this->taxRate / 100);
        }

        return [
            'totalTax' => round($totalTax, 2), // Round the total tax to 2 decimal points
            'totalAmount' => round($totalAmount, 2), // Round the total amount to 2 decimal points
            'totalNeedToPay' => round($totalAmount + $totalTax, 2) // Round the total amount to pay to 2 decimal points
        ];
    }
}