<?php
namespace src\module\permissions\service;

use permission\permission\logic\SavePermission;
use src\infrastructure\Service;
use src\module\permissions\objects\Permission;

class SetPermissionService extends Service{
    protected ListPermissions $permission;

    public function __construct(){
        parent::__construct();
        $this->permission = new ListPermissions();
    }
    
    public function process($id, $table, $read, $write, $edit, $delete){
        (new SavePermission())->set($id, $table, $read, $write, $edit, $delete);
        $permission = new Permission($id, $table, $read, $write, $edit, $delete);
        $this->setOutput($permission);
        return $this;
    }
}