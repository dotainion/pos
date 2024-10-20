<?php
namespace src\module\permission\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\permission\factory\PermissionFactory;
use src\module\permission\logic\SavePermission;
use src\module\user\logic\FetchUser;

class SavePermissionService extends Service{
    protected SavePermission $permission;
    protected PermissionFactory $factory;
    protected FetchUser $user;

    public function __construct(){
        parent::__construct(false);
        $this->permission = new SavePermission();
        $this->factory = new PermissionFactory();
        $this->user = new FetchUser();
    }
    
    public function process($userId, $read, $write, $edit, $delete){
        Assert::validUuid($userId, 'User not found.');

        $collector = $this->user->user(new Id($userId));
        $collector->assertHasItem('User not found.');

        $permission = $this->factory->mapResult([
            'id' => $userId,
            'r' => $read,
            'w' => $write,
            'e' => $edit,
            'd' => $delete,
        ]);
        
        $this->permission->set($permission);

        $this->setOutput($this->factory);
        return $this;
    }
}