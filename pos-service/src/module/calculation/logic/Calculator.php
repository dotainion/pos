<?php
namespace src\module\calculation\logic;

use src\module\calculation\factory\AmountFactory;
use src\module\calculation\objects\Amount;
use src\module\discount\objects\Discount;
use src\module\discount\objects\TypeValue;
use src\module\item\objects\Item;
use src\module\order\objects\Order;
use src\module\tax\logic\ListTaxes;
use tools\infrastructure\Collector;

class Calculator{
    protected Amount $amount;
    protected AmountFactory $factory;
    protected ListTaxes $taxes;
    protected Collector $taxCollector;

    public function __construct(){
        $this->factory = new AmountFactory();
        $this->taxes = new ListTaxes();
    }

    public function byOrder(Order $order):void{
        $totalAmount = 0;
        $totalDiscount = 0;
        $nonTaxableTotalAmount = 0;
        $nonTaxableTotalDiscount = 0;

        $this->taxCollector = $this->taxes->activeTax();

        foreach($order->items()->list() as $orderLine){
            $total = ($orderLine->item()->amount() * $orderLine->quantity());
            if ($orderLine->item()->isTaxable()){
                $totalAmount += $total;
            }else{
                $nonTaxableTotalAmount += $total;
            }
        }

        foreach($order->discounts()->list() as $orderLine){
            $amount = $this->calculateDiscountAmount($orderLine->discount(), $totalAmount);
            if($orderLine->discount()->isTaxable()){
                $totalDiscount += $amount;
            }else{
                $nonTaxableTotalDiscount += $amount;
            }
        }

        $taxableAmount = max($totalAmount - $totalDiscount, 0);
        $totalAmount += $nonTaxableTotalAmount;
        $totalDiscount += $nonTaxableTotalDiscount;

        $totalTax = $this->calculateTax($taxableAmount, $order);
        
        $this->amount = $this->factory->mapResult([
            'id' => $order->id()->toString(),
            'totalTax' => round($totalTax, 2),
            'totalAmount' => round($totalAmount, 2),
            'totalDiscount' => round($totalDiscount, 2),
            'netTotal' => round($totalAmount + $totalTax, 2),
        ]);
    }

    private function calculateDiscountAmount(Discount $discount, float $totalAmount):float{
        if($discount->type() === TypeValue::DollarAmountType){
            return $discount->value();
        }elseif($discount->type() === TypeValue::PercentageType){
            return $totalAmount * ($discount->value() / 100);
        }
        return 0;
    }

    private function calculateTax(float $taxableAmount, Order $order):float{
        $totalTax = 0; // Ensure this variable is defined correctly

        foreach($order->items()->list() as $orderLine){
            if(!$orderLine->item()->isTaxable()){
                continue;
            }

            $taxRate = $this->findTaxRate($orderLine->item());
            if($orderLine->item()->inclusive()){  // Check the item's inclusive status
                $totalTax += $taxableAmount - ($taxableAmount / (1 + $taxRate / 100));
            }else{
                $totalTax += $taxableAmount * ($taxRate / 100);
            }
        }

        return $totalTax;
    }

    public function amount():Amount{
        return $this->amount;
    }

    public function findTaxRate(Item $item):float{
        $relatedTax = reset(array_filter($this->taxCollector->list(), function($tax) use($item) {
            return $tax->categoryId() !== null && $tax->categoryId()->toString() === $item->categoryId()->toString();
        }));
    
        if ($relatedTax !== false) {
            return $relatedTax->value();
        }
    
        $mainTax = reset(array_filter($this->taxCollector->list(), function($tax) {
            return $tax->categoryId() !== null;
        }));
    
        if ($mainTax !== false) {
            return $mainTax->value();
        }
    
        return 0;
    }
}
