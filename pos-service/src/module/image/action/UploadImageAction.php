<?php
namespace src\module\image\action;

use src\infrastructure\IAction;
use src\infrastructure\Request;
use src\module\image\service\UploadImageService;

class UploadImageAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new UploadImageService();
    }

    public function execute(){
        return $this->service->process(
            $this->file('file'),
            $this->get('itemId')
        );
    }
}