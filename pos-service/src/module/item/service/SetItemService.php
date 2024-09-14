<?php
namespace src\module\item\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\item\factory\ItemFactory;
use src\module\item\logic\SetItem;

class SetItemService extends Service{
    protected SetItem $item;
    protected ItemFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->item = new SetItem();
        $this->factory = new ItemFactory();
    }
    
    public function process($id, $categoryId, $itemId, $name, $amount, $isTaxable, $quantity, $description){
        Assert::validUuid($categoryId, 'Susu not found.');
        Assert::stringNotEmpty($name, 'Item must have a valid name.');

        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $item = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'categoryId' => $categoryId,
            'itemId' => $itemId,
            'name' => $name,
            'amount' => $amount,
            'isTaxable' => $isTaxable,
            'quantity' => $quantity,
            'description' => $description,
        ]);

        $this->item->set($item);

        $this->setOutput($item);
        return $this;
    }
}