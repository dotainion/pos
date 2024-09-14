<?php
namespace src\infrastructure;

class SearchRequest extends Request{
    
    public function uuid(string $attribute):?Id{
        $id = new Id($this->get($attribute));
        if($id->hasId()){
            return $id;
        }
        return null;
    }
}