<?php
namespace src\module\image\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\image\service\DeleteImageService;

class DeleteImageAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new DeleteImageService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id')
        );
    }
}