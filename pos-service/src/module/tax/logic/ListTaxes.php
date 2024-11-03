<?php
namespace src\module\tax\logic;

use tools\infrastructure\Collector;
use src\infrastructure\SearchRequest;
use src\module\tax\repository\TaxRepository;

class ListTaxes{
    protected TaxRepository $repo;

    public function __construct(){
        $this->repo = new TaxRepository();
    }

    public function bySearchRequest(SearchRequest $req):Collector{
        if(!$req->hasArgs()){
            return new Collector();
        }
        return $this->repo->listTaxes($req->where());
    }

    public function activeTax():Collector{
        return $this->repo->listTaxes([
            'active' => true
        ]);
    }

    public function byCategoryIdArray(array $categoryIdArray):Collector{
        if(empty($categoryIdArray)){
            return new Collector();
        }
        return $this->repo->listTaxes([
            'categoryId' => $categoryIdArray
        ]);
    }
}