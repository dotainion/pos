<?php
namespace src\module\permissions\service;

use permission\infrastructure\SqlId;
use permission\permission\logic\ListPermission;
use src\infrastructure\Collector;
use src\infrastructure\Id;
use src\infrastructure\SearchRequest;

class ListPermissions{
    protected ListPermission $permission;

    public function __construct(){
        $this->permission = new ListPermission();
    }
    
    public function permission(SearchRequest $searchRequest){
        $where = $searchRequest->where();
        if(!isset($where['id']) || !(new Id())->isValid($where['id'])){
            return new Collector();
        }
        return $this->permission->byUserId(new SqlId($where['id']));
    }
}