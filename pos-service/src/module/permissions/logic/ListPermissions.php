<?php
namespace src\module\permissions\service;

use permission\infrastructure\SqlId;
use permission\permission\logic\ListPermission;
use permission\infrastructure\Collector;
use tools\infrastructure\Id;
use src\infrastructure\SearchRequest;

class ListPermissions{
    protected ListPermission $permission;

    public function __construct(){
        $this->permission = new ListPermission();
    }
    
    public function permission(SearchRequest $searchRequest):Collector{
        $where = $searchRequest->where();
        if(!isset($where['id']) || !(new Id())->isValid($where['id'])){
            return new Collector();
        }
        return $this->permission->byUserId(new SqlId($where['id']));
    }
}