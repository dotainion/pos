<?php
namespace src\module\permission\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\module\permission\objects\Permission;
use src\module\user\factory\UserFactory;

class PermissionFactory extends Collector{
    use Factory;
    protected UserFactory $factory;

    public function __construct(){
        $this->factory = new UserFactory();
    }

    public function mapResult($record):Permission{
        return new Permission(
            $this->uuid($record['id']),
            (bool)$record['r'],
            (bool)$record['w'],
            (bool)$record['e'],
            (bool)$record['d']
        );
    }
}