<?php
namespace src\module\item\service;

use src\infrastructure\Assert;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\item\factory\ItemFactory;
use src\module\item\factory\ItemLinkFactory;
use src\module\item\logic\ListItemLinks;
use src\module\item\logic\SetItem;
use src\module\item\logic\SetItemLink;

class SetItemService extends Service{
    protected SetItem $item;
    protected SetItemLink $link;
    protected ListItemLinks $links;
    protected ItemFactory $factory;
    protected ItemLinkFactory $linkFactory;

    public function __construct(){
        parent::__construct();
        $this->item = new SetItem();
        $this->link = new SetItemLink();
        $this->links = new ListItemLinks();
        $this->factory = new ItemFactory();
        $this->linkFactory = new ItemLinkFactory();
    }
    
    public function process($id, $categoryId, $name, $amount, $favorite, $isTaxable, $quantity, $description, $bundleItemIdArray){
        Assert::validUuid($categoryId, 'Susu not found.');
        Assert::stringNotEmpty($name, 'Item must have a valid name.');

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $item = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'categoryId' => $categoryId,
            'name' => $name,
            'amount' => $amount,
            'favorite' => $favorite,
            'isTaxable' => $isTaxable,
            'quantity' => $quantity,
            'description' => $description,
        ]);

        $this->item->set($item);

        foreach($bundleItemIdArray ?? [] as $itemId){
            if(!$idObj->isValid($itemId)){
                continue;
            }
            $link = $this->linkFactory->mapResult([
                'parentItemId' => $item->id()->toString(),
                'itemId' => $itemId,
            ]);
            $this->linkFactory->add($link);
        }

        $this->link->massSet($this->linkFactory);

        $itemIdArrayToDelete = [];
        foreach($this->linkFactory->list() as $link){
            $itemIdArrayToDelete[] = $link->itemId()->toString();
        }
        
        $linksToDelete = new Collector();
        $linksCollector = $this->links->byParentItemId($item->id());
        foreach($linksCollector->list() as $link){
            if(!in_array($link->itemId()->toString(), $itemIdArrayToDelete)){
                $linksToDelete->add($link);
            }
        }
        $this->link->massSet($linksToDelete);

        $this->setOutput($item);
        return $this;
    }
}