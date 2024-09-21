<?php
namespace src\module\item\service;

use src\infrastructure\SearchRequest;
use src\infrastructure\Service;
use src\module\item\logic\AppendBundleItems;
use src\module\item\logic\ListItems;

class ListItemsService extends Service{
    protected ListItems $items;
    protected AppendBundleItems $requirements;

    public function __construct(){
        parent::__construct();
        $this->items = new ListItems();
        $this->requirements = new AppendBundleItems();
    }
    
    public function process(SearchRequest $searchRequest){
        $collector = $this->items->bySearchRequest($searchRequest);
        $collector->assertHasItem('No items found.');

        $this->requirements->appendBundleItems($collector);

        $this->setOutput($collector);
        return $this;
    }
}