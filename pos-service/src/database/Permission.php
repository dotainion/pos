<?php
namespace src\database;

use Exception;
use src\infrastructure\Collector;
use src\infrastructure\exeptions\PermissionException;
use src\module\permission\factory\PermissionFactory;
use src\module\permission\objects\IPermission;
use src\security\SecurityManager;

class Permission {
    protected Table $table;
    protected Repository $repo;
    protected PermissionFactory $factory;
    protected SecurityManager $manager;

    public function __construct(Table $table){
        $this->table = $table;
        $this->repo = new Repository();
        $this->factory = new PermissionFactory();
        $this->manager = new SecurityManager();
    }

    public function permission(string $tableName = 'permission'):self{
        $collector = $this->list($tableName);
        $collector->assertHasItem('You do not have permission.');
        $this->assert($collector->first());
        return $this;
    }

    public function list(string $tableName):Collector{
		$this->repo->select($tableName)
            ->where()->eq('id', $this->repo->uuid($this->manager->user()->id()))
            ->cursor()->pagination()->limit(1);
        $this->repo->execute();
        return $this->factory->map($this->repo->results());
    }

    public function assert(IPermission $permission):self{
        if($this->isRead() && !$permission->read()){
            throw new PermissionException('You do not have permission to view or edit this resource.');
        }
		if($this->isWrite() && !$permission->write()){
            throw new PermissionException('You do not have permission to add or create new resources.');
        }
		if($this->isEdit() && !$permission->edit()){
            throw new PermissionException('You do not have permission to modify this resource.');
        }
		if($this->isDelete() && !$permission->delete()){
            throw new PermissionException('Error: You do not have permission to delete this resource.');
        }
        if(!$this->isRead() && !$this->isWrite() && !$this->isEdit() && !$this->isDelete()){
            throw new Exception('You need to first call select, insert, update or delete before using calling permission.');
        }
        return $this;
    }

    public function isRead():bool{
        return str_contains($this->table->getQuery(), 'SELECT');
    }

    public function isWrite():bool{
        return str_contains($this->table->getQuery(), 'INSERT');
    }

    public function isEdit():bool{
        return str_contains($this->table->getQuery(), 'UPDATE');
    }

    public function isDelete():bool{
        return str_contains($this->table->getQuery(), 'DELETE');
    }
}