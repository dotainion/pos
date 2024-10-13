<?php
namespace src\module\tax\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\tax\service\SetTaxService;

class SetTaxAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetTaxService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('name'),
            $this->get('categoryId'),
            $this->get('value'),
            $this->get('active'),
            $this->get('description'),
            $this->get('delete')
        );
    }
}