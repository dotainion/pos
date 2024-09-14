<?php
namespace src\module\item\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\item\objects\ItemSearchRequest;
use src\module\item\service\ListItemsService;

class ListItemsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListItemsService();
    }

    public function execute(){
        return $this->service->process(
            new ItemSearchRequest()
        );
    }
}