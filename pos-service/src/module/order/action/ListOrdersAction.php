<?php
namespace src\module\order\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\infrastructure\SearchRequest;
use src\module\order\service\ListOrdersService;

class ListOrdersAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListOrdersService();
    }

    public function execute(){
        return $this->service->process(
            new SearchRequest()
        );
    }
}