<?php
namespace src\module\tax\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\infrastructure\SearchRequest;
use src\module\tax\service\ListTaxesService;

class ListTaxesAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListTaxesService();
    }

    public function execute(){
        return $this->service->process(
            new SearchRequest()
        );
    }
}