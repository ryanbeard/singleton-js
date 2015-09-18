<h1 align="center">Singleton JS</h1>

# About Singleton JS
In a nut-shell, it lets you do this:
```
var m1 = new MyClass();
var m2 = new MyClass();
// m1 === m2
```
Singleton JS allows you to return the same instance of a javascript "class" regardless of calls to `new`, allowing you
to treat regular classes and singletons in exactly the same way.

Traditional approaches would have you either return the class already instantiated, or for lazy instantiation, wrapped 
in a function which then requires you to call `MySingleton.getInstance()`. I don't like this, I want to have my cake and
eat it!

With the Singleton JS approach, you can define a singleton as lazily-instantiated, or immediately-instantiated but
treat it in the same way as you would with regular classes (e.g. `new MySingleton()`) and always get the same
instance back!

# API

## singleton(Class [, options])
Create a singleton from a class. Defaults to creating a lazily-instantiated singleton (instantiated when
first referenced).

### Class {function}
This can be any javascript class.

### options {object}
Configuration options for the singleton.

#### options.instantiate {boolean}
To immediately instantiate the singleton rather than waiting for it to be referenced.

#### options.arguments {[*]}
An array of arguments to be passed in when the singleton is instantiated. If the singleton is lazily-instantiated and 
arguments are passed in during that instantiation, those arguments will supercede any arguments configured via
`options.arguments`.


# Examples

## Lazily instantiated singleton
Create a lazily instantiated singleton (default):
```
var MyClass = function () {
    ...class methods/properties etc
};
var MySingleton = singleton(MyClass);
```

Instantiate the singleton (this only *actually* instantiates the singleton the first time):
```
var m1 = new MySingleton();
```

You don't have to call new, but it doesn't hurt. The same code can be written as:
```
var m1 = MySingleton();
```

Future instantiations will simply return the previously instantiated instance:
```
var m2 = new MySingleton();  // === m1
```

You obviously don't have to create the class independently of the singleton, you can just create the singleton directly:
```
var MySingleton = singleton(function () {
    ...methods/properties etc
});
```


## Immediately instantiated singleton
You may sometimes wish for the singleton to be instantiated immediately rather than waiting for when it's first used.
This is possible by setting the `instantiate` flag via the options parameter.

Create an immediately instantiated singleton:
```
var MyClass = function () {
    ...class methods/properties etc
};
var MySingleton = singleton(MyClass, {
    instantiate: true
});
```

Future instantiations simply refer to the already instantiated singleton.
```
var m1 = new MySingleton();  // Singleton has already been instantiated, so m1 is just a reference to it.
var m2 = new MySingleton();  // === m1
```

## Using preset arguments
You can preset the arguments to pass in when the singleton is instantiated, for both immediately and lazily 
instantiated singletons:
```
var MyImmediateClass = function (param) {
    console.log(param);
};
var MyImmediateSingleton = singleton(MyImmediateClass, {
    arguments: ['foo'],
    instantiate: true
});

var MyLazyClass = function (param) {
    console.log(param);
};
var MyLazySingleton = singleton(MyLazyClass, {
    arguments: ['bar']
});

var m1 = new MyLazySingleton(); // will console.log 'bar' as the singleton is instantiated
                                // 'foo' has already been console logged by the immediately instantiated singleton
```

## Notes

### Instantiating with arguments
When you instantiate the singleton, it's possible to pass in arguments that you wish the instance to be created with.
If the instance has already been created however, passing in arguments is irrelevant and they will be lost.
This may create unexpected behaviour, leaving you wondering what happened to the arguments you passed in.
As a means of avoiding this potential pitfall, I took the decision to throw an error if this situation occurs. I may 
later change this to simply logging a warning, or even look into how those arguments could be populated into the 
existing instance, but for now an error is thrown.

### Use of the 'new' keyword
It's up to you which method you prefer, but it makes no difference whether you do or don't use the new keyword. I would
suggest picking one method and sticking with it. The reason it's there is to allow for the seamless transition between
instantiating a standard class, and instantiating a Singleton.