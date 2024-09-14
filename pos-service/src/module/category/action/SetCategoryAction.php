<?php
namespace src\module\category\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\category\service\SetCategoryService;

class SetCategoryAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetCategoryService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name'),
            $this->get('amount'),
            $this->get('description')
        );
    }
}