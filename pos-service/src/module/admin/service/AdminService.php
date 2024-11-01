<?php
namespace src\module\admin\service;

use permission\module\permission\logic\SavePermission;
use src\infrastructure\Service;
use src\module\user\service\CreateUserService;
use src\schema\Schema;

class AdminService extends Service{
    public function __construct(){
        parent::__construct(false);
    }
    
    public function process(){
        $service = (new CreateUserService())->process(
            'John', 
            'Wick', 
            'example@example.com', 
            '', 
            '', 
            'User1234#', 
            'User1234#'
        );
        $userId = $service->output()->first()['id'];

        foreach(get_class_methods(new Schema()) as $tableName){
            if(in_array($tableName, ['__construct', 'run'])) continue;
            (new SavePermission())->set($userId, $tableName, true, true, true, true);
        }

        $this->mergeOutput($service);
        return $this;
    }
}