<?php
namespace src\module\permission\logic;

use InvalidArgumentException;
use src\module\permission\action\PermissionRepository;
use src\module\permission\objects\Permission;

class SavePermission{
    protected PermissionRepository $repo;

    public function __construct(){
        $this->repo = new PermissionRepository();
    }

    public function set(Permission $permission):void{
        if(!$permission->read() && !$permission->write() && !$permission->edit() && !$permission->delete()){
            throw new InvalidArgumentException('At least one permission (read, write, edit, or delete) must be granted to save changes.');
        }
        $collector = $this->repo->listPermission([
            'id' => $permission->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($permission);
            return;
        }
        $this->repo->create($permission);
    }
}
