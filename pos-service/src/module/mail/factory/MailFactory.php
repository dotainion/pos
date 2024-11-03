<?php
namespace src\module\mail\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use tools\module\mail\objects\Mail;

class MailFactory extends Collector{
    use Factory;

    public function __construct(){
    }
    
    public function mapResult($record):Mail{
        $mail = new Mail();
        $mail->setId($this->uuid($record['id']));
        $mail->setSubject($record['subject']);
        $mail->setBody($record['body']);
        return $mail;
    }
}