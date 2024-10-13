<?php
namespace src\module\tax\service;

use src\infrastructure\Service;
use src\module\tax\logic\AppendTaxRequirements;
use src\module\tax\logic\ListTaxes;

class ListTaxesService extends Service{
    protected ListTaxes $taxes;
    protected AppendTaxRequirements $categories;

    public function __construct(){
        parent::__construct();
        $this->taxes = new ListTaxes();
        $this->categories = new AppendTaxRequirements();
    }
    
    public function process($searchRequest){
        $collector = $this->taxes->bySearchRequest($searchRequest);
        $collector->assertHasItem('No taxes found.');

        $this->categories->appendRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}