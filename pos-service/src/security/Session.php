<?php
namespace src\security;

use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\ICredential;
use src\infrastructure\IUser;

class Session{
    protected static string $SESSION_KEY = 'session-key';

    public static function key():string{
        return self::$SESSION_KEY;
    }

    public static function user():?IUser{
        if(!isset($_SESSION[self::key()])){
            throw new NotAuthenticatedException('You are not authenticated.');
        }
        return self::session()->user();
    }

    public static function session():?ICredential{
        $session = unserialize($_SESSION[Session::key()]);
        if(!$session instanceof ICredential){
            return null;
        }
        return $session;
    }

}