<?php
namespace src\module\discount\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\discount\service\SetDiscountService;

class SetDiscountAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetDiscountService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name'),
            $this->get('type'),
            $this->get('value'),
            $this->get('description')
        );
    }
}