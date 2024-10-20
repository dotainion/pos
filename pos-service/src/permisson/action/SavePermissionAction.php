<?php
namespace src\module\permission\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\permission\service\SavePermissionService;

class SavePermissionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SavePermissionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('read'), 
            $this->get('write'), 
            $this->get('edit'), 
            $this->get('delete')
        );
    }
}