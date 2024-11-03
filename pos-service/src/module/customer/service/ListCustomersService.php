<?php
namespace src\module\customer\service;

use src\infrastructure\SearchRequest;
use tools\infrastructure\Collector;
use src\infrastructure\Service;
use src\module\customer\logic\ListCustomers;
use src\module\order\logic\ListOrders;

class ListCustomersService extends Service{
    protected ListOrders $orders;
    protected ListCustomers $categories;

    public function __construct(){
        parent::__construct();
        $this->orders = new ListOrders();
        $this->categories = new ListCustomers();
    }
    
    public function process(SearchRequest $searchRequest){
        $collector = $this->categories->bySearchRequest($searchRequest);
        $collector->assertHasItem('No customer found.');

        $orderCollector = $this->orders->listActiveByCustomerIdArray($collector->idArray());

        //add orders related to customer customer.
        foreach($collector->list() as $customer){
            $orders = new Collector();
            foreach($orderCollector->list() as $order){
                if($order->customerId()->toString() === $customer->id()->toString()){
                    $orders->add($order);
                }
            }
            $customer->setOrders($orders);
        }

        $this->setOutput($collector);
        return $this;
    }
}