<?php
namespace src\module\customer\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\customer\service\SetCustomerService;

class SetCustomerAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetCustomerService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name'),
            $this->get('email'),
            $this->get('phone'),
            $this->get('gender'),
            $this->get('date'),
            $this->get('hide')
        );
    }
}