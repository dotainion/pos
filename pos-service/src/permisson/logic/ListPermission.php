<?php
namespace src\module\permission\logic;

use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\module\permission\action\PermissionRepository;

class ListPermission{
    protected PermissionRepository $repo;

    public function __construct(){
        $this->repo = new PermissionRepository();
    }

    public function byId(Id $userId):Collector{
        return $this->repo->listPermission([
            'id' => $userId
        ]);
    }
}
