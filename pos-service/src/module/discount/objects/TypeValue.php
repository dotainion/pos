<?php
namespace src\module\discount\objects;

use InvalidArgumentException;

class TypeValue{
    const DollarAmount = 'Dollar Amount';
    const DollarAmountSymbol = '$';
    const DollarAmountType = 0;
    const Percentage = 'Percentage';
    const PercentageSymbol = '%';
    const PercentageType = 1;

    protected int $type;
    protected array $types;

    public function __construct(int $type){
        if(!isset($this->types[$type])){
            throw new InvalidArgumentException('Invalid discount type.');
        }
        $this->type = $type;
        $this->types = [
            TypeValue::DollarAmountType => ['name' => TypeValue::DollarAmount, 'symbol' => TypeValue::DollarAmountSymbol],
            TypeValue::PercentageType => ['name' => TypeValue::Percentage, 'symbol' => TypeValue::PercentageSymbol]
        ];
    }

    public function display():string{
        return $this->name().'('.$this->symbol().')';
    }

    public function name():string{
        return $this->types[$this->type()]['name'];
    }

    public function symbol():string{
        return $this->types[$this->type()]['symbol'];
    }

    public function type():int{
        return $this->type;
    }
}