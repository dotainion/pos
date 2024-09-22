<?php
namespace src\module\order\service;

use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\order\factory\OrderFactory;
use src\module\order\factory\OrderLinkFactory;
use src\module\order\logic\SetOrder;
use src\module\order\logic\SetOrderLinks;

class SetOrderService extends Service{
    protected SetOrder $order;
    protected OrderFactory $factory;
    protected OrderLinkFactory $linkFactory;
    protected SetOrderLinks $orderLinks;

    public function __construct(){
        parent::__construct();
        $this->order = new SetOrder();
        $this->factory = new OrderFactory();
        $this->linkFactory = new OrderLinkFactory();
        $this->orderLinks = new SetOrderLinks();
    }
    
    public function process($id, $customerId, $completed, $canceled, $date, $referenceIdArray){

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $dateHelper = new DateHelper();
        $dateHelper->isValid($date) ? $dateHelper->set($date) : $dateHelper->new();

        $order = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'customerId' => $customerId,
            'completed' => $completed,
            'canceled' => $canceled,
            'date' => $dateHelper->toString()
        ]);

        $this->order->set($order);

        //the referenceIdArray could be item or discount
        foreach($referenceIdArray ?? [] as $referenceId){
            $link = $this->linkFactory->mapResult([
                'orderId' => $order->id()->toString(),
                'referenceId' => $referenceId['referenceId'],
                'quantity' => $referenceId['quantity']
            ]);
            $this->linkFactory->add($link);
        }

        $this->orderLinks->massControlCreate($this->linkFactory, $order->id());

        $this->setOutput($order);
        return $this;
    }
}