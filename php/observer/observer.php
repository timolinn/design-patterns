<?php

class Observed implements SplSubject
{
    protected $property;
    protected $observers = [];
    public function attach(SplObserver $observer)
    {
        $this->observers[] = $observer;
        return $this;
    }
    public function detach(SplObserver $observer)
    {
        if (false !== $key = array_search($observer, $this->observers, true)) {
            unset($this->observers[$key]);
        }
    }
    public function notify()
    {
        foreach ($this->observers as $observer) {
            $observer->update($this);
        }
    }
    public function getProperty()
    {
        return $this->property;
    }
    public function setProperty($property)
    {
        $this->property = $property;
        $this->notify();
    }
}

class NamedObserver implements SplObserver
{
    protected $name;

    public function __construct($name)
    {
        $this->name = $name;
    }
    public function update(SplSubject $subject)
    {
        echo $this->name, ' has been notified! New property value: ', $subject->getProperty(), "\n";
    }
}

$o = new Observed;
$o->attach(new NamedObserver('Observer1'))
    ->attach(new NamedObserver('Observer2'));
$o->setProperty('Hello world!');
