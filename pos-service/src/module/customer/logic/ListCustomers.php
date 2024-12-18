<?php
namespace src\module\customer\logic;

use tools\infrastructure\Collector;
use src\infrastructure\SearchRequest;
use src\module\customer\repository\CustomerRepository;
use tools\infrastructure\Id;

class ListCustomers{
    protected CustomerRepository $repo;

    public function __construct(){
        $this->repo = new CustomerRepository();
    }

    public function bySearchRequest(SearchRequest $req):Collector{
        if(!$req->hasArgs()){
            return new Collector();
        }
        return $this->repo->listCustomers($req->where());
    }

    public function list():Collector{
        return $this->repo->listCustomers();
    }

    public function byId(Id $id):Collector{
        return $this->byIdArray([$id]);
    }

    public function byIdArray(array $idArray):Collector{
        if(empty($idArray)){
            return new Collector();
        }
        return $this->repo->listCustomers([
            'id' => $idArray
        ]);
    }
}