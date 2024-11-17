<?php
namespace src\module\payment\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IObjects;

class Charge  implements IObjects{
    protected Id $id;
    protected float $amount;
    protected string $status;
    protected bool $captured;
    protected string $receipEmail;

    public function __construct(string $id, float $amount, string $status, bool $captured, string $receipEmail){
        $this->id = new Id($id);
        $this->amount = $amount;
        $this->status = $status;
        $this->captured = $captured;
        $this->receipEmail = $receipEmail;
    }

    public function id():Id{
        return $this->id;
    }
    
    public function amount():float{
        return $this->amount;
    }
    
    public function status():bool{
        return $this->status;
    }

    public function captured():bool{
        return $this->captured;
    }
    
    public function receipEmail():string{
        return $this->receipEmail;
    }
}