<?php
namespace src\module\order\repository;

use src\infrastructure\Repository;
use src\infrastructure\Collector;
use src\module\order\factory\AddonFactory;
use src\module\order\objects\Addon;

class AddonRepository extends Repository{
    protected AddonFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new AddonFactory();
    }
    
    public function create(Addon $addon):void{
        $this->insert('addon')        
            ->column('id', $this->uuid($addon->id()))
            ->column('orderLineId', $this->uuid($addon->orderLineId()))
            ->column('itemId', $this->uuid($addon->itemId()))
            ->column('quantity', $addon->quantity());
        $this->execute();
    }
    
    public function edit(Addon $addon):void{
        $this->update('addon')
            ->column('id', $this->uuid($addon->id()))
            ->column('quantity', $addon->quantity())
            ->where()
            ->eq('orderLineId', $this->uuid($addon->orderLineId()))
            ->eq('itemId', $this->uuid($addon->itemId()));
        $this->execute();
    }
    
    public function deleteAddon(Addon $addon):void{
        $this->delete('addon')
            ->where()->eq('id', $this->uuid($addon->id()));
        $this->execute();
    }
    
    public function listAddons(array $where = []):Collector{
        $this->select('addon');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['orderLineId'])){
            $this->where()->eq('orderLineId', $this->uuid($where['orderLineId']));
        }
        if(isset($where['itemId'])){
            $this->where()->eq('itemId', $this->uuid($where['itemId']));
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}