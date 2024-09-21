<?php
namespace src\module\order\logic;

use src\infrastructure\Collector;
use src\module\customer\logic\ListCustomers;
use src\module\discount\logic\ListDiscounts;
use src\module\item\logic\AppendBundleItems;
use src\module\item\logic\ListItems;
use src\module\order\repository\OrderRepository;

class AppendOrderRequirements{
    protected OrderRepository $repo;
    protected ListOrderLinks $links;
    protected ListItems $items;
    protected ListDiscounts $discounts;
    protected ListCustomers $customers;

    public function __construct(){
        $this->repo = new OrderRepository();
        $this->links = new ListOrderLinks();
        $this->items = new ListItems();
        $this->discounts = new ListDiscounts();
        $this->customers = new ListCustomers();
    }

    public function appendRequirements(Collector &$orders):void{
        $orderLinksCollector = $this->links->byOrderIdArray($orders->idArray());

        $itemCollector = $this->items->byIdArray($orderLinksCollector->attrArray('referenceId'));
        $discountCollector = $this->discounts->byIdArray($orderLinksCollector->attrArray('referenceId'));
        $customerCollector = $this->customers->byIdArray($orders->attrArray('customerId'));

        (new AppendBundleItems())->appendBundleItems($itemCollector);

        foreach($orders->list() as $order){
            $items = new Collector();
            //add items in order
            /*foreach($orderLinksCollector->list() as $orderLink){
                if($order->id()->toString() === $orderLink->orderId()->toString()){
                    foreach($itemCollector->list() as $item){
                        if($orderLink->referenceId()->toString() === $item->id()->toString()){
                            $items->add($order);
                            break;
                        }
                    }
                }
            }

            $discounts = new Collector();
            //add discounts in order
            foreach($orderLinksCollector->list() as $orderLink){
                if($order->id()->toString() === $orderLink->orderId()->toString()){
                    foreach($discountCollector->list() as $discount){
                        if($orderLink->referenceId()->toString() === $discount->id()->toString()){
                            $discounts->add($order);
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
            }*/

            var_dump($items);
            //$order->setItems($items);
            //$order->setDiscounts($discounts);
            //($customer !== null) && $order->setCustomer($customer);
        }
    }
}