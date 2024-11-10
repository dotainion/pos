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
            if(in_array($method, ['__construct', 'run'])) continue;
            if($permissionCollector->filter('table', $method)->isEmpty()){
                $permissionCollector->add(new Permission($searchRequest->id()->toString(), $method, false, false, false, false));
            }
        }

        $permissionCollector->assertHasItem('No permissoins found.');
        $this->setOutput($permissionCollector);
        return $this;
    }
}