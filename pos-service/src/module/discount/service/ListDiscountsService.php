<?php
namespace src\module\discount\service;

use src\infrastructure\Service;
use src\module\discount\logic\ListDiscounts;

class ListDiscountsService extends Service{
    protected ListDiscounts $discounts;

    public function __construct(){
        parent::__construct();
        $this->discounts = new ListDiscounts();
    }
    
    public function process(){
        $collector = $this->discounts->list();
        $collector->assertHasItem('No discount found.');

        $this->setOutput($collector);
        return $this;
    }
}