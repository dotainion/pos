<?php
namespace src\schema;

use Exception;
use src\database\Table;

class Schema{
    protected $sql = null;

    public function __construct(){
        $this->sql = new Table();
    }

    public function user(){
        $this->sql->create('user')
            ->column('id')->bindary()
            ->column('firstName')->string()
            ->column('lastName')->string()
            ->column('email')->string()
            ->column('hide')->bool()
            ->column('date')->timestamp()
            ->column('gender')->string()
            ->column('phoneNumber')->string()
            ->column('addressId')->bindary()
            ->column('foreignId')->string();
        return $this->sql->execute();
    }

    public function address(){
        $this->sql->create('address')
            ->column('id')->bindary()
            ->column('country')->string()
            ->column('state')->string()
            ->column('address')->paragraph()
            ->column('apt')->string()
            ->column('zip')->string();
        return $this->sql->execute();
    }

    public function credential(){
        $this->sql->create('credential')
            ->column('id')->bindary()
            ->column('expire')->timestamp()
            ->column('password')->string()
            ->column('token')->string()
            ->column('refreshToken')->string();
        return $this->sql->execute();
    }

    public function customer(){
        $this->sql->create('customer')
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('email')->string()
            ->column('phone')->string()
            ->column('gender')->string()
            ->column('hide')->bool()
            ->column('date')->timestamp();
        return $this->sql->execute();
    }

    public function order(){
        $this->sql->create('order')
            ->column('id')->bindary()
            ->column('customerId')->bindary(true)
            ->column('completed')->bool()
            ->column('canceled')->bool();
        return $this->sql->execute();
    }

    public function orderLink(){
        $this->sql->create('orderLink')
            ->column('orderId')->bindary()
            ->column('referenceId')->bindary();
        return $this->sql->execute();
    }

    public function category(){
        $this->sql->create('category')
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('amount')->string()
            ->column('description')->book();
        return $this->sql->execute();
    }

    public function discount(){
        $this->sql->create('discount')
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('type')->int()
            ->column('value')->string()
            ->column('description')->book();
        return $this->sql->execute();
    }

    public function item(){
        $this->sql->create('item')
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('categoryId')->bindary()
            ->column('amount')->string()
            ->column('itemId')->bool()//the item this item is under as a bundle
            ->column('isTaxable')->bool()
            ->column('quantity')->int()
            ->column('description')->book();
        return $this->sql->execute();
    }

    public function run(){
        foreach(get_class_methods($this) as $method){
            if($method === '__construct' || $method === 'run') continue;
            if (!is_callable([$this, $method])) {
                throw new Exception($method.' is not callable');
            }
            $this->$method()->reset();
        }
    }
}
