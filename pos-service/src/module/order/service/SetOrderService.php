<?php
namespace src\module\order\service;

use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\order\factory\AddonFactory;
use src\module\order\factory\OrderFactory;
use src\module\order\factory\OrderLineFactory;
use src\module\order\logic\AppendOrderRequirements;
use src\module\order\logic\SetAddons;
use src\module\order\logic\SetOrder;
use src\module\order\logic\SetOrderLines;

class SetOrderService extends Service{
    protected SetOrder $order;
    protected OrderFactory $factory;
    protected OrderLineFactory $linkFactory;
    protected SetOrderLines $orderLinks;
    protected AppendOrderRequirements $requirements;
    protected AddonFactory $addonFactory;
    protected SetAddons $addon;

    public function __construct(){
        parent::__construct();
        $this->order = new SetOrder();
        $this->factory = new OrderFactory();
        $this->linkFactory = new OrderLineFactory();
        $this->orderLinks = new SetOrderLines();
        $this->requirements = new AppendOrderRequirements();
        $this->addonFactory = new AddonFactory();
        $this->addon = new SetAddons();
    }
    
    public function process($id, $customerId, $completed, $canceled, $date, $orderLineArray){

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
        foreach($orderLineArray ?? [] as $orderLine){
            $link = $this->linkFactory->mapResult([
                'id' => $orderLine['id'],
                'orderId' => $order->id()->toString(),
                'referenceId' => $orderLine['referenceId'],
                'quantity' => $orderLine['quantity']
            ]);
            $this->linkFactory->add($link);
            foreach($orderLine['addonArray'] as $addon){
                $option = $this->addonFactory->mapResult([
                    'id' => $addon['id'],
                    'orderLineId' => $addon['orderLineId'],
                    'itemId' => $addon['itemId'],
                    'quantity' => $addon['quantity']
                ]);
                $this->addonFactory->add($option);
            }
        }

        $this->orderLinks->massSet($this->linkFactory, $order->id());
        $this->addon->massSet($this->addonFactory, $this->linkFactory->idArray());

        $collector = new Collector();
        $collector->add($order);
        $this->requirements->appendRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}