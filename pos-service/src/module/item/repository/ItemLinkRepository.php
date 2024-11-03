<?php
namespace src\module\item\repository;

use tools\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\item\factory\ItemLinkFactory;
use src\module\item\objects\ItemLink;

class ItemLinkRepository extends Repository{
    protected ItemLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ItemLinkFactory();
    }
    
    public function create(ItemLink $itemLink):void{
        $this->insert('itemLink')        
            ->column('parentItemId', $this->uuid($itemLink->parentItemId()))
            ->column('itemId', $this->uuid($itemLink->itemId()))
            ->column('amount', $itemLink->amount())
            ->column('optional', $itemLink->optional())
            ->column('priceIncluded', $itemLink->priceIncluded())
            ->column('taxInclusive', $itemLink->taxInclusive())
            ->column('increaseQuantity', $itemLink->increaseQuantity());
        $this->execute();
    }
    
    public function edit(ItemLink $itemLink):void{
        $this->update('itemLink')
            ->column('amount', $itemLink->amount())
            ->column('optional', $itemLink->optional())
            ->column('priceIncluded', $itemLink->priceIncluded())
            ->column('taxInclusive', $itemLink->taxInclusive())
            ->column('increaseQuantity', $itemLink->increaseQuantity())
            ->where()
            ->eq('parentItemId', $this->uuid($itemLink->parentItemId()))
            ->eq('itemId', $this->uuid($itemLink->itemId()));
        $this->execute();
    }
    
    public function deleteItemLink(ItemLink $itemLink):void{
        $this->delete('itemLink')
            ->where()
            ->eq('parentItemId', $this->uuid($itemLink->parentItemId()))
            ->eq('itemId', $this->uuid($itemLink->itemId()));
        $this->execute();
    }
    
    public function listItemLinks(array $where = []):Collector{
        $this->select('itemLink');

        if(isset($where['parentItemId'])){
            $this->where()->eq('parentItemId', $this->uuid($where['parentItemId']));
        }
        if(isset($where['itemId'])){
            $this->where()->eq('itemId', $this->uuid($where['itemId']));
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}