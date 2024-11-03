<?php
namespace src\module\image\repository;

use tools\infrastructure\Repository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\image\factory\ImageFactory;
use src\module\image\objects\Image;

class ImageRepository extends Repository{
    protected ImageFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ImageFactory();
    }
    
    public function create(Image $image):void{
        $this->insert('image')        
            ->column('id', $this->uuid($image->id()))
            ->column('itemId', $this->uuid($image->itemId()))
            ->column('name', $image->name())
            ->column('extention', $image->extention());
        $this->execute();
    }
    
    public function edit(Image $image):void{
        $this->update('image')
            ->column('itemId', $this->uuid($image->itemId()))
            ->column('name', $image->name())
            ->column('extention', $image->extention())
            ->where()->eq('id', $this->uuid($image->id()));
        $this->execute();
    }
    
    public function deleteImages(Id $id):void{
        $this->delete('image') 
            ->where()->eq('id', $this->uuid($id));
        $this->execute();
    }
    
    public function list(array $where):Collector{
        $this->select('image');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where()->eq('name', $where['name']);
        }
        if(isset($where['itemId'])){
            $this->where()->eq('itemId', $this->uuid($where['itemId']));
        }
        if(isset($where['extention'])){
            $this->where()->eq('extention', $where['extention']);
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}