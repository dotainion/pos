<?php
namespace src\module\payment\factory;

use src\module\payment\objects\Intent;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use Stripe\PaymentIntent;

class IntentFactory extends Collector{
    protected ChargeFactory $chartFactory;
    protected PaymentTypeFactory $paymentTypeFactory;

    use Factory;

    public function __construct(){
        $this->chartFactory = new ChargeFactory();
        $this->paymentTypeFactory = new PaymentTypeFactory();
    }

    public function mapToPaymentIntent(PaymentIntent $paymentIntent):Intent{
        return new Intent(
            (string)$paymentIntent->id,
            (float)$paymentIntent->amount,
            (float)$paymentIntent->amount_received,
            (string)$paymentIntent->currency,
            (string)$paymentIntent->status,
            (string)$paymentIntent->description,
            (string)$paymentIntent->client_Secret,
            (string)$paymentIntent->receip_email,
            $this->paymentTypeFactory->mapFromPaymentIntent($paymentIntent),
            $this->chartFactory->mapFromPaymentIntent($paymentIntent)
        );
    }
}