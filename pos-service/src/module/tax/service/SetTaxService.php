<?php
namespace src\module\tax\service;

use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\tax\logic\SetTax;
use src\module\tax\factory\TaxFactory;
use src\module\tax\logic\AppendTaxRequirements;

class SetTaxService extends Service{
    protected SetTax $tax;
    protected TaxFactory $factory;
    protected AppendTaxRequirements $categories;

    public function __construct(){
        parent::__construct();
        $this->tax = new SetTax();
        $this->factory = new TaxFactory();
        $this->categories = new AppendTaxRequirements();
    }
    
    public function process($id, $name, $categoryId, $value, $active, $description, $delete){
        $idObj = new Id();
        $idObj->isValid($id) ? $idObj->set($id) : $idObj->new();

        $tax = $this->factory->mapResult([
            'id' => $idObj->toString(),
            'name' => $name,
            'categoryId' => $categoryId,
            'value' => $value,
            'active' => $active,
            'date' => (new DateHelper())->new()->toString(),
            'description' => $description,
            'delete' => $delete
        ]);

        $this->tax->set($tax);

        $collector = new Collector();
        $collector->add($tax);
        $this->categories->appendRequirements($collector);
        $this->setOutput($collector);
        return $this;
    }
}