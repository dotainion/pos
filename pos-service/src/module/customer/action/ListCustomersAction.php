<?php
namespace src\module\customer\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\infrastructure\SearchRequest;
use src\module\customer\service\ListCustomersService;

class ListCustomersAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListCustomersService();
    }

    public function execute(){
        return $this->service->process(
            new SearchRequest()
        );
    }
}