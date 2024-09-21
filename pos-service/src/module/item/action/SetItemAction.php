<?php
namespace src\module\item\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\item\service\SetItemService;

class SetItemAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetItemService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('categoryId'),
            $this->get('name'),
            $this->get('amount'),
            $this->get('favorite'),
            $this->get('isTaxable'),
            $this->get('quantity'),
            $this->get('description'),
            $this->get('bundleItemIdArray')
        );
    }
}