<?php
namespace src\module\item\objects;

use src\infrastructure\Id;
use src\infrastructure\SearchRequest;

class ItemSearchRequest extends SearchRequest{

    public function __construct(){
    }

    public function id():?Id{
        return $this->uuid('id');
    }

    public function categoryId():?Id{
        return $this->uuid('categoryId');
    }

    public function itemId():?Id{
        return $this->uuid('itemId');
    }

    public function name():?string{
        return $this->get('name');
    }

    public function hasId():bool{
        return (bool)$this->uuid('id');
    }

    public function hasCategoryId():bool{
        return (bool)$this->uuid('categoryId');
    }

    public function hasItemId():bool{
        return (bool)$this->uuid('itemId');
    }

    public function hasName():bool{
        return (bool)$this->name();
    }
}