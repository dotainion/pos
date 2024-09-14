<?php
namespace src\module\customer\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\customer\service\ListCustomersService;

class ListCustomersAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListCustomersService();
    }

    public function execute(){
        return $this->service->process();
    }
}