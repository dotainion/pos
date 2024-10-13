<?php
namespace src\module\item\logic;

use src\infrastructure\Collector;
use src\module\category\logic\ListCategories;
use src\module\image\logic\ListImage;
use src\module\item\logic\ListItems;
use src\module\order\repository\OrderRepository;

class AppendItemsRequirements{
    protected OrderRepository $repo;
    protected ListItems $items;
    protected ListItemLinks $links;
    protected ListCategories $categories;
    protected ListImage $images;

    public function __construct(){
        $this->repo = new OrderRepository();
        $this->items = new ListItems();
        $this->links = new ListItemLinks();
        $this->categories = new ListCategories();
        $this->images = new ListImage();
    }

    public function appendRequirements(Collector &$items):void{
        $linksCollector = $this->links->byParentItemIdArray($items->idArray());
        $bundleItemsCollector = $this->items->byIdArray($linksCollector->attrArray('itemId'));
        $categoryCollector = $this->categories->byIdArray(array_filter($items->attrArray('categoryId'), fn($id)=>$id !== null));
        $imageCollector = $this->images->byItemIdArray($items->idArray());

        foreach($items->list() as $item){
            $bundleItems = new Collector();
            foreach($linksCollector->list() as $itemLink){
                foreach($bundleItemsCollector->list() as $bundleItem){
                    if(
                        $item->id()->toString() === $itemLink->parentItemId()->toString() &&
                        $bundleItem->id()->toString() === $itemLink->itemId()->toString()
                    ){
                        $bundleItem->setItemLink($itemLink);
                        $bundleItems->add($bundleItem);
                    }
                }
            }
            $categories = new Collector();
            foreach($categoryCollector->list() as $category){
                if($item->categoryId()->toString() === $category->id()->toString()){
                    $categories->add($category);
                    break;
                }
            }
            $images = new Collector();
            foreach($imageCollector->list() as $image){
                if($image->itemId()->toString() === $item->id()->toString()){
                    $images->add($image);
                    break;
                }
            }
            $item->setBundleItems($bundleItems);
            $categories->hasItem() && $item->setCategory($categories->first());
            $images->hasItem() && $item->setImage($images->first());
        }
    }
}