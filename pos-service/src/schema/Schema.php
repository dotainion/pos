<?php
namespace src\schema;

use Exception;
use src\schema\Table;

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
            ->column('canceled')->bool()
            ->column('date')->timestamp();
        return $this->sql->execute();
    }

    public function orderLine(){
        $this->sql->create('orderLine')
            ->column('id')->bindary()
            ->column('orderId')->bindary()
            ->column('referenceId')->bindary()//either items or discounts
            ->column('quantity')->string();
        return $this->sql->execute();
    }

    public function addon(){
        $this->sql->create('addon')
            ->column('id')->bindary()
            ->column('orderLineId')->bindary()
            ->column('itemId')->bindary()
            ->column('quantity')->string();
        return $this->sql->execute();
    }

    public function category(){
        $this->sql->create('category')
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('color')->string()
            ->column('inactive')->bool()
            ->column('description')->book();
        return $this->sql->execute();
    }

    public function discount(){
        $this->sql->create('discount')
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('type')->int()
            ->column('value')->string()
            ->column('isTaxable')->bool()
            ->column('description')->book();
        return $this->sql->execute();
    }

    public function itemLink(){
        $this->sql->create('itemLink')
            ->column('parentItemId')->bindary()
            ->column('itemId')->bindary()
            ->column('amount')->string()
            ->column('optional')->bool()
            ->column('priceIncluded')->bool()
            ->column('taxInclusive')->bool()
            ->column('increaseQuantity')->bool();
        return $this->sql->execute();
    }

    public function item(){
        $this->sql->create('item')
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('categoryId')->bindary()
            ->column('amount')->string()
            ->column('cost')->string()
            ->column('isTaxable')->bool()
            ->column('quantity')->int()
            ->column('favorite')->bool()
            ->column('description')->book()
            ->column('active')->bool()
            ->column('inclusive')->bool();
        return $this->sql->execute();
    }

    public function tax(){
        $this->sql->create('tax')
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('categoryId')->bindary(true)
            ->column('value')->string()
            ->column('date')->timestamp()
            ->column('active')->bool()
            ->column('description')->book();
        return $this->sql->execute();
    }

    public function image(){
        $this->sql->create('image')
            ->column('id')->bindary()
            ->column('itemId')->bindary()
            ->column('name')->string()
            ->column('extention')->string();
        return $this->sql->execute();
    }

    public function receipt(){
        $this->sql->create('receipt')
            ->column('id')->bindary()
            ->column('customerId')->bindary(true)
            ->column('completed')->bool()
            ->column('canceled')->bool()
            ->column('date')->timestamp();
        return $this->sql->execute();
    }

    public function receiptItem(){
        $this->sql->create('receiptItem')
            ->column('id')->bindary()
            ->column('receiptId')->bindary()
            ->column('itemId')->bindary()
            ->column('name')->string()
            ->column('amount')->string()
            ->column('quantity')->int()
            ->column('isTaxable')->bool()
            ->column('inclusive')->bool();
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
