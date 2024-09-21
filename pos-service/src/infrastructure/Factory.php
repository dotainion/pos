<?php
namespace src\infrastructure;

use Exception;
use Throwable;

trait Factory{
    protected $DEFAULT_UUID = '00000000-0000-0000-0000-000000000000';

    public function map(array $records){
        $this->clear();
        if (!method_exists($this, 'mapResult')){
            throw new Exception('Factory must have method mapResult.');
        }
        foreach($records as $record){
            if (!$this->isValid($record)){
                throw new Exception('Factory record must be assosiative array.');
            }
            $this->add($this->mapResult($record));
        };
        return $this;
    }

    public function isValid($record){
        if (!is_array($record)){
            return false;
        }
        return true;
    }

    public function isDefaultUuId($uuidBytes):bool{
        if($uuidBytes === $this->DEFAULT_UUID){
            return true;
        }
        if((new Id())->fromBytes((string)$uuidBytes)->toString() === $this->DEFAULT_UUID){
            return true;
        }
        return false;
    }

    public function isValidUUid($uuid):bool{
        return (new Id())->isValid((string)$uuid);
    }

    public function uuid($uuidBytes){
        try{
            if($this->isValidUUid($uuidBytes)){
                return $uuidBytes;
            }
            return (new Id())->fromBytes((string)$uuidBytes)->toString();
        }catch(Throwable $ex){
            return null;
        }
    }
}