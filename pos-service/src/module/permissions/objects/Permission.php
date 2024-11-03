<?php
namespace src\module\permissions\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IObjects;

class Permission implements IObjects{
    protected Id $id;
    protected string $table;
    protected bool $read;
    protected bool $write;
    protected bool $edit;
    protected bool $delete;

    public function __construct(
        string $id, 
        string $table, 
        bool $read, 
        bool $write, 
        bool $edit, 
        bool $delete
    ){
        $this->id = new Id($id);
        $this->table = $table;
        $this->read = $read;
        $this->write = $write;
        $this->edit = $edit;
        $this->delete = $delete;
    }

    public function id():Id{
        return $this->id;
    }

    public function table():string{
        return $this->table;
    }


    public function read():bool{
        return $this->read;
    }

    public function write():bool{
        return $this->write;
    }

    public function edit():bool{
        return $this->edit;
    }

    public function delete():bool{
        return $this->delete;
    }
}
