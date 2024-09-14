<?php
namespace src\module\item\logic;

use src\infrastructure\Collector;
use src\module\item\logic\ListItems;
use src\module\order\repository\OrderRepository;

class AppendBundleItems{
    protected OrderRepository $repo;
    protected ListItems $items;

    public function __construct(){
        $this->repo = new OrderRepository();
        $this->items = new ListItems();
    }

    public function appendBundleItems(Collector &$items):void{
        $bundleItemsCollector = $this->items->byItemIdArray($items->idArray());

        foreach($items->list() as $item){
            $bundleItems = new Collector();
            foreach($bundleItemsCollector->list() as $bundleItem){
                if($item->id()->toString() === $bundleItem->itemId()->toString()){
                    $bundleItems->add($bundleItem);
                }
            }
            $item->setBundleItems($bundleItems);
        }
    }
}