<?php
namespace src\module\permissions\service;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\infrastructure\SearchRequest;
use src\infrastructure\Service;
use src\module\permissions\objects\Permission;
use src\schema\Schema;

class ListPermissionsService extends Service{
    protected ListPermissions $permission;

    public function __construct(){
        parent::__construct();
        $this->permission = new ListPermissions();
    }
    
    public function process(SearchRequest $searchRequest){
        $collector = $this->permission->permission($searchRequest);
        $collector->assertHasItem('No permissoins found.');

        $permissionCollector = new Collector();
        foreach($collector->list() as $permission){
            $permissionCollector->add(
                new Permission(
                    $permission->id()->toString(),
                    $permission->table(),
                    $permission->read(),
                    $permission->write(),
                    $permission->edit(),
                    $permission->delete()
                )
            );
        }

        foreach(get_class_methods(new Schema()) as $method){
            if(in_array($method, ['__construct', 'run', 'permission'])) continue;

            $found = $permissionCollector->filter('table', $method);
            if($found->isEmpty()){
                $permissionCollector->add(new Permission((new Id())->new()->toString(), false, false, false, false, false));
            }
        }

        $this->setOutput($permissionCollector);
        return $this;
    }
}