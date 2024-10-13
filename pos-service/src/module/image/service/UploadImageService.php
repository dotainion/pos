<?php
namespace src\module\image\service;

use src\infrastructure\Assert;
use src\infrastructure\Env;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\image\factory\ImageFactory;
use src\module\image\logic\SaveImage;
use src\module\item\logic\ListItems;

class UploadImageService extends Service{
    protected ImageFactory $factory;
    protected SaveImage $save;
    protected ListItems $item;

    public function __construct(){
        parent::__construct();
        $this->factory = new ImageFactory();
        $this->save = new SaveImage();
        $this->item = new ListItems();
    }
    
    public function process($file, $itemId){
        Assert::validUuid($itemId, 'Item not found.');
        Assert::arrayNotEmpty($file, 'File not found.');

        $collector = $this->item->byId(new Id($itemId));
        $collector->assertHasItem('Item not found.');

        $info = pathinfo($file['name']);
        $uniqueName = (new Id())->new()->toString();

        $target = (new Env())->rootDir() . '/pos-files/' . $uniqueName . '.' . $info['extension'];
        move_uploaded_file($file['tmp_name'], $target);

        $image = $this->factory->mapResult([
            'id' => $uniqueName,
            'itemId' => $itemId,
            'name' => $info['filename'],
            'extention' => $info['extension'],
        ]);

        $this->save->set($image);

        $this->setOutput($image);
        return $this;
    }
}