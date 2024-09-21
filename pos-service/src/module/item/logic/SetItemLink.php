<?php
namespace src\module\item\logic;

use src\infrastructure\Collector;
use src\module\item\objects\ItemLink;
use src\module\item\repository\ItemLinkRepository;

class SetItemLink{
    protected ItemLinkRepository $repo;

    public function __construct(){
        $this->repo = new ItemLinkRepository();
    }

    public function set(ItemLink $itemLink):void{
        $collector = $this->repo->listItemLinks([
            'parentItemId' => $itemLink->parentItemId(),
            'itemId' => $itemLink->itemId()
        ]);
        if($collector->hasItem()){
            return;
        }
        $this->repo->create($itemLink);
    }

    public function delete(ItemLink $itemLink):void{
        $collector = $this->repo->listItemLinks([
            'parentItemId' => $itemLink->parentItemId(),
            'itemId' => $itemLink->itemId()
        ]);
        if($collector->hasItem()){
            $this->repo->deleteItemLink($itemLink);
        }
    }

    public function massSet(Collector $links):void{
        foreach($links->list() as $link){
            $this->set($link);
        }
    }

    public function massDelete(Collector $links):void{
        foreach($links->list() as $link){
            $this->delete($link);
        }
    }
}