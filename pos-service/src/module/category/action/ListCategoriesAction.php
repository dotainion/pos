<?php
namespace src\module\category\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\category\service\ListCategoriesService;

class ListCategoriesAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListCategoriesService();
    }

    public function execute(){
        return $this->service->process();
    }
}