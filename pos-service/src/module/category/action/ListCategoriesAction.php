<?php
namespace src\module\category\action;

use src\infrastructure\SearchRequest;
use src\module\category\service\ListCategoriesService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class ListCategoriesAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListCategoriesService();
    }

    public function execute(){
        return $this->service->process(
            new SearchRequest()
        );
    }
}