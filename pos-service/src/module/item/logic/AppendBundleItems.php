<?php
namespace src\module\item\logic;

use src\infrastructure\Collector;
use src\module\item\logic\ListItems;
use src\module\order\repository\OrderRepository;

class AppendBundleItems{
    protected OrderRepository $repo;
    protected ListItems $items;
    protected ListItemLinks $links;

    public function __construct(){
        $this->repo = new OrderRepository();
        $this->items = new ListItems();
        $this->links = new ListItemLinks();
    }

    public function appendBundleItems(Collector &$items):void{
        $linksCollector = $this->links->byParentItemIdArray($items->idArray());
        $bundleItemsCollector = $this->items->byIdArray($linksCollector->idArray());

        foreach($items->list() as $item){
            $itemIdArray = [];
            foreach($linksCollector->list() as $itemLink){
                if($item->id()->toString() === $itemLink->parentItemId()->toString()){
                    $itemIdArray[] = $itemLink->itemId()->toString();
                }
            }
            $bundleItems = new Collector();
            foreach($bundleItemsCollector->list() as $bundleItem){
                if(in_array($bundleItem->id()->toString(), $itemIdArray)){
                    $bundleItems->add($bundleItem);
                    break;
                }
            }
            $item->setBundleItems($bundleItems);
        }
    }
}