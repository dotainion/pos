<?php
namespace src\module\item\logic;

use src\module\item\objects\Item;
use src\module\item\repository\ItemRepository;

class SetItem{
    protected ItemRepository $repo;

    public function __construct(){
        $this->repo = new ItemRepository();
    }

    public function set(Item $item):void{
        $collector = $this->repo->listItems([
            'id' => $item->id(),
        ]);
        if($collector->hasItem()){
            $this->repo->edit($item);
            return;
        }
        $this->repo->create($item);
    }
}