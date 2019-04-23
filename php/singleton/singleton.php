<?php

// Some people consider singletons to be bad practice, with good reasons too
// DO use dependency injection where you can and aim for loosely coupled objects, but
// sometimes that is just not reasonable and the singleton pattern can be of use.
class Singleton
{
    private static $instance;

    private function __construct()
    { }

    public static function getInstance()
    {

        if (!isset(static::$instance)) {
            static::$instance = new Singleton();
        }

        return static::$instance;
    }
}

$instance1 = Singleton::getInstance();
$instance2 = Singleton::getInstance();
var_dump($instance1 === $instance2);


// Singleton with traits
trait SingletonTrait
{
    private static $instance;

    private function __construct()
    { }

    public static function getInstance()
    {

        if (!isset(static::$instance)) {
            static::$instance = new Singleton();
        }

        return static::$instance;
    }

    // Prevent cloning of the instance
    protected function __clone()
    { }
    // Prevent serialization of the instance
    protected function __sleep()
    { }
    // Prevent deserialization of the instance
    protected function __wakeup()
    { }
}

class Mongoose
{
    use SingletonTrait;
}

$mongoose1 = Singleton::getInstance();
$mongoose2 = Singleton::getInstance();
var_dump($mongoose1 === $mongoose2);
