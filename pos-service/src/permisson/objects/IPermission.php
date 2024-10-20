<?php
namespace src\module\permission\objects;

use src\infrastructure\Id;

interface IPermission{
    public function id():Id;
    public function read():bool;
    public function write():bool;
    public function edit():bool;
    public function delete():bool;
}