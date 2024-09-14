<?php
namespace src\module\order\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\order\service\SetOrderService;

class SetOrderAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetOrderService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('customerId'),
            $this->get('completed'),
            $this->get('canceled'),
            $this->get('referenceIdArray')
        );
    }
}