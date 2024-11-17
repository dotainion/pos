<?php
namespace src\module\payment\objects;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use tools\infrastructure\IObjects;

class Intent  implements IObjects{
    protected Id $id;
    protected float $amount;
    protected float $amountReceived;
    protected string $currency;
    protected string $status;
    protected string $description;
    protected string $clientSecret;
    protected string $receipEmail;
    protected Collector $paymentMethodTypes;
    protected Collector $charges;

    public function __construct(
        string $id,
        float $amount,
        float $amountReceived,
        string $currency,
        string $status,
        string $description,
        string $clientSecret,
        string $receipEmail,
        Collector $paymentMethodTypes,
        Collector $charges
    ){
        $this->id = $id;
        $this->amount = $amount;
        $this->amountReceived = $amountReceived;
        $this->currency = $currency;
        $this->status = $status;
        $this->description = $description;
        $this->clientSecret = $clientSecret;
        $this->receipEmail = $receipEmail;
        $this->paymentMethodTypes = $paymentMethodTypes;
        $this->charges = $charges;
    }

    public function id():Id{
        return $this->id;
    }
    
    public function amount():float{
        return $this->amount;
    }

    public function amountReceived():float{
        return $this->amountReceived;
    }

    public function currency():string{
        return $this->currency;
    }

    public function status():string{
        return $this->status;
    }

    public function description():string{
        return $this->description;
    }

    public function clientSecret():string{
        return $this->clientSecret;
    }

    public function receipEmail():string{
        return $this->receipEmail;
    }

    public function paymentMethodTypes():Collector{
        return $this->paymentMethodTypes;
    }

    public function charges():Collector{
        return $this->charges;
    }
}