<?php
namespace src\module\customer\logic;

use src\infrastructure\Collector;
use src\module\customer\repository\CustomerRepository;

class ListCustomers{
    protected CustomerRepository $repo;

    public function __construct(){
        $this->repo = new CustomerRepository();
    }

    public function list():Collector{
        return $this->repo->listCustomers();
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