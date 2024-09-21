<?php
namespace src\module\item\repository;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\item\factory\ItemFactory;
use src\module\item\objects\Item;
use src\module\item\objects\ItemLink;

class ItemLinkRepository extends Repository{
    protected ItemFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ItemFactory();
    }
    
    public function create(ItemLink $itemLink):void{
        $this->insert('itemLink')        
            ->add('parentItemId', $this->uuid($itemLink->parentItemId()))
            ->add('itemId', $this->uuid($itemLink->itemId()));
        $this->execute();
    }
    
    public function deleteItemLink(ItemLink $itemLink):void{
        $this->update('itemLink')
            ->where('parentItemId', $this->uuid($itemLink->parentItemId()))
            ->where('itemId', $this->uuid($itemLink->itemId()));
        $this->execute();
    }
    
    public function listItemLinks(array $where = []):Collector{
        $this->select('itemLink');

        if(isset($where['parentItemId'])){
            $this->where('parentItemId', $this->uuid($where['parentItemId']));
        }
        if(isset($where['itemId'])){
            $this->where('itemId', $this->uuid($where['itemId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}