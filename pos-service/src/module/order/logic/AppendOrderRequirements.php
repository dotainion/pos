<?php
namespace src\module\order\logic;

use tools\infrastructure\Collector;
use src\module\calculation\logic\Calculator;
use src\module\customer\logic\ListCustomers;
use src\module\discount\logic\ListDiscounts;
use src\module\item\logic\AppendItemsRequirements;
use src\module\item\logic\ListItemLinks;
use src\module\item\logic\ListItems;

class AppendOrderRequirements{
    protected ListOrderLines $links;
    protected ListItems $items;
    protected ListDiscounts $discounts;
    protected ListCustomers $customers;
    protected ListAddons $addons;
    protected ListItemLinks $itemLinks;

    public function __construct(){
        $this->links = new ListOrderLines();
        $this->items = new ListItems();
        $this->discounts = new ListDiscounts();
        $this->customers = new ListCustomers();
        $this->addons = new ListAddons();
        $this->itemLinks = new ListItemLinks();
    }

    public function appendRequirements(Collector &$orders):void{
        $orderLineCollector = $this->links->byOrderIdArray($orders->idArray());

        $itemCollector = $this->items->byIdArray($orderLineCollector->attrArray('referenceId'));
        $discountCollector = $this->discounts->byIdArray($orderLineCollector->attrArray('referenceId'));
        $customerCollector = $this->customers->byIdArray(array_filter($orders->attrArray('customerId'), fn($id)=>$id !== null));
        $addonsCollector = $this->addons->byOrderLineIdArray($orderLineCollector->idArray());
        $itemLinksCollector = $this->itemLinks->byParentItemIdArray($itemCollector->idArray());

        (new AppendItemsRequirements())->appendRequirements($itemCollector);

        $calculate = new Calculator();

        foreach($orders->list() as $order){
            $items = new Collector();
            //add items in order line then in order
            foreach($orderLineCollector->list() as $orderLine){
                if($order->id()->toString() === $orderLine->orderId()->toString()){
                    foreach($itemCollector->list() as $item){
                        if($orderLine->referenceId()->toString() === $item->id()->toString()){
                            $orderLine->setItem($item);
                            $addons = new Collector();
                            foreach($addonsCollector->list() as $addon){
                                if($orderLine->id()->toString() === $addon->orderLineId()->toString()){
                                    foreach($itemCollector->list() as $childItem){
                                        if($childItem->id()->toString() === $addon->itemId()->toString()){
                                            foreach($itemLinksCollector->list() as $itmLink){
                                                if(
                                                    $item->id()->toString() === $itmLink->parentItemId()->toString() && 
                                                    $childItem->id()->toString() === $itmLink->itemId()->toString()
                                                ){
                                                    $childItem->setItemLink($itmLink);
                                                    break;
                                                }
                                            }
                                            $addon->setItem($childItem);
                                            break;
                                        }
                                    }
                                    $addons->add($addon);
                                }
                            }
                            $orderLine->setAddons($addons);
                            $items->add($orderLine);
                            break;
                        }
                    }
                }
            }

            $discounts = new Collector();
            //add discounts in order line then in order
            foreach($orderLineCollector->list() as $orderLine){
                if($order->id()->toString() === $orderLine->orderId()->toString()){
                    foreach($discountCollector->list() as $discount){
                        if($orderLine->referenceId()->toString() === $discount->id()->toString()){
                            $orderLine->setDiscount($discount);
                            $discounts->add($orderLine);
                            break;
                        }
                    }
                }
            }
            
            $customer = null;
            //add customer in order
            foreach($customerCollector->list() as $orderCustomer){
                if($order->customerId() !== null && $order->customerId()->toString() === $orderCustomer->id()->toString()){
                    $customer = $orderCustomer;
                    break;
                }
            }

            $order->setItems($items);
            $order->setDiscounts($discounts);
            ($customer !== null) && $order->setCustomer($customer);

            $calculate->byOrder($order);
            $order->setAmount($calculate->amount());
        }
    }
}