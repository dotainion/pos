<?php
namespace src\module\payment\service;

use src\infrastructure\Service;
use src\module\customer\logic\ListCustomers;
use src\module\payment\factory\IntentFactory;
use src\module\receipt\service\CreateReceiptService;
use tools\infrastructure\Id;
use tools\stripe\StripeCustomer;
use tools\stripe\StripePayment;

class CreatePaymentIntentService extends Service{
    protected ListCustomers $user;
    protected StripeCustomer $customer;
    protected StripePayment $payment;
    protected IntentFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->user = new ListCustomers();
        $this->customer = new StripeCustomer();
        $this->payment = new StripePayment();
        $this->factory = new IntentFactory();
    }
    
    public function process(string $orderId, ?string $userId, string $currency, float $amount){
        $customer = null;
        if((new Id())->isValid($userId)){
            $collector = $this->user->byId(new Id($userId));
            $collector->assertHasItem('Customer found.');
            $customer = $this->customer->createCustomerIfNotExist($collector->first());
        }

        $paymentIntent = $this->payment->createPaymentIntent($customer, $currency, $amount);
        $intent = $this->factory->mapToPaymentIntent($paymentIntent);

        (new CreateReceiptService)->process($orderId);

        $this->setOutput($intent);
        return $this;
    }
}