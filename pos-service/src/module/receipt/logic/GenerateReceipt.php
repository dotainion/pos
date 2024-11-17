<?php
namespace src\module\receipt\logic;

use src\module\order\logic\AppendOrderRequirements;
use src\module\order\logic\ListOrders;
use src\module\receipt\factory\ReceiptFactory;
use src\module\receipt\factory\ReceiptItemFactory;
use src\module\receipt\objects\Receipt;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;

class GenerateReceipt{
    protected ListOrders $orders;
    protected AppendOrderRequirements $requirements;
    protected ReceiptFactory $receiptFactory;
    protected ReceiptItemFactory $receiptItemFactory;

    public function __construct(){
        $this->orders = new ListOrders();
        $this->requirements = new AppendOrderRequirements();
        $this->receiptFactory = new ReceiptFactory();
        $this->receiptItemFactory = new ReceiptItemFactory();
    }

    public function generate(Id $orderId):Receipt{
        $collector = $this->orders->byId($orderId);
        $collector->assertHasItem('No orders found.');
        $this->requirements->appendRequirements($collector);

        $receipt = $this->receiptFactory->mapResult([
            'id' => (new Id())->new()->toString(),
            'customerId' => $collector->first()->customer()->id()->toString(),
            'completed' => false,
            'canceled' => false,
            'date' => (new DateHelper())->new()->toString(),
        ]);

        foreach($collector->first()->items()->list() as $orderLine){
            $receiptItem = $this->receiptItemFactory->mapResult([
                'id' => (new Id())->new()->toString(),
                'receiptId' => $receipt->id()->toString(),
                'itemId' => $orderLine->item()->id()->toString(),
                'name' => $orderLine->item()->name(),
                'amount' => $orderLine->item()->amount(),
                'quantity' => $orderLine->quantity(),
                'isTaxable' => $orderLine->item()->isTaxable(),
                'inclusive' => $orderLine->item()->inclusive(),
            ]);
            $receipt->items()->add($receiptItem);

            foreach($orderLine->addons()->list() as $addon){
                $receiptBundleItem = $this->receiptItemFactory->mapResult([
                    'id' => (new Id())->new()->toString(),
                    'receiptId' => $receipt->id()->toString(),
                    'receiptItemParentId' => $receiptItem->id()->toString(),//tells that its a bundle item
                    'itemId' => $addon->id()->toString(),
                    'name' => $addon->item()->name(),
                    'amount' => $addon->item()->itemLink()->priceIncluded() ? 0 : $addon->item()->itemLink()->amount(),
                    'quantity' => $addon->quantity(),
                    'isTaxable' => $addon->item()->isTaxable(),
                    'inclusive' => $addon->item()->itemLink()->taxInclusive(),
                ]);
                $receipt->items()->add($receiptBundleItem);
            }
        }

        return $receipt;
    }
}