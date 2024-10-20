<?php
namespace src\module\permission\action;

use src\database\Repository;
use src\infrastructure\Collector;
use src\module\user\factory\AddressFactory;
use src\module\files\factory\FileFactory;
use src\module\permission\objects\Permission;

class PermissionRepository extends Repository{
    protected FileFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new AddressFactory();
    }
    
    public function create(Permission $permission):void{
        $this->insert('permission')        
            ->column('id', $this->uuid($permission->id()))
            ->column('r', $permission->read())
            ->column('w', $permission->write())
            ->column('e', $permission->edit())
            ->column('d', $permission->delete());
        $this->execute();
    }
    
    public function edit(Permission $permission):void{
        $this->update('permission')
            ->column('r', $permission->read())
            ->column('w', $permission->write())
            ->column('e', $permission->edit())
            ->column('d', $permission->delete())
            ->where()->eq('id', $this->uuid($permission->id()));
        $this->execute();
    }
    
    public function listPermission(array $where=[]):Collector{
        $this->select('permission');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}