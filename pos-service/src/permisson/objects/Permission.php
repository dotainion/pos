<?php
namespace src\module\permission\objects;

use src\infrastructure\Id;

class Permission implements IPermission{
    protected Id $id;
    protected bool $read;
    protected bool $write;
    protected bool $edit;
    protected bool $delete;

    public function __construct(string $id, bool $read, bool $write, bool $edit, bool $delete){
        $this->id = new Id($id);
        $this->read = $read;
        $this->write = $write;
        $this->edit = $edit;
        $this->delete = $delete;
    }

    public function id():Id{
        return $this->id;
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
