<?php
namespace src\module\order\logic;

use tools\infrastructure\Collector;
use src\module\order\objects\Addon;
use src\module\order\repository\AddonRepository;

class SetAddons{
    protected AddonRepository $repo;

    public function __construct(){
        $this->repo = new AddonRepository();
    }

    public function set(Addon $addon):void{
        $collector = $this->repo->listAddons([
            'id' => $addon->id(),
        ]);
        if($collector->hasItem()){
            $this->repo->edit($addon);
            return;
        }
        $this->repo->create($addon);
    }

    public function delete(Addon $addon):void{
        $collector = $this->repo->listAddons([
            'id' => $addon->id(),
        ]);
        if(!$collector->hasItem()){
            return;
        }
        $this->repo->deleteAddon($addon);
    }

    public function massSet(Collector $addons, array $orderLineId):void{
        if($addons->isEmpty()){
            return;
        }
        $collector = $this->repo->listAddons([
            'orderLineId' => $orderLineId
        ]);
        $collectorToDelete = new Collector();
        foreach($collector->list() as $exist){
            $found = false;
            foreach($addons->list() as $link){
                if($exist->id()->toString() === $link->id()->toString()){
                    $found = true;
                }
            }
            !$found && $collectorToDelete->add($exist);
        }
        foreach($collectorToDelete->list() as $deleteLink){
            $this->delete($deleteLink);
        }
        foreach($addons->list() as $link){
            $this->set($link);
        }
    }
}