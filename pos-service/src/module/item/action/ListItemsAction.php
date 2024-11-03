<?php
namespace src\module\item\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\infrastructure\SearchRequest;
use src\module\item\service\ListItemsService;

class ListItemsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListItemsService();
    }

    public function execute(){
        return $this->service->process(
            new SearchRequest()
        );
    }
}