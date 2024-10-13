<?php
namespace src\module\tax\logic;

use src\module\tax\repository\TaxRepository;
use src\module\tax\objects\Tax;

class SetTax{
    protected TaxRepository $repo;

    public function __construct(){
        $this->repo = new TaxRepository();
    }

    public function set(Tax $tax):void{
        if($tax->delete()){
            $this->repo->deleteTax($tax);
            return;
        }
        $collector = $this->repo->listTaxes([
            'id' => $tax->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($tax);
            return;
        }
        $this->repo->create($tax);
    }
}