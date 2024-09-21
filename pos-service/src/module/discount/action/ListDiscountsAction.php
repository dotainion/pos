<?php
namespace src\module\discount\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\infrastructure\SearchRequest;
use src\module\discount\service\ListDiscountsService;

class ListDiscountsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListDiscountsService();
    }

    public function execute(){
        return $this->service->process(
            new SearchRequest()
        );
    }
}