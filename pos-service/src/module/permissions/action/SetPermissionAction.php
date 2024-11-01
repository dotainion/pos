<?php
namespace src\module\permissions\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\permissions\service\SetPermissionService;

class SetPermissionAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetPermissionService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('table'),
            $this->get('read'),
            $this->get('write'),
            $this->get('edit'),
            $this->get('delete'),
        );
    }
}