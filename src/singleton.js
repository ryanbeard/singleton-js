(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof exports === 'object') {
        module.exports = factory();
    }
    else {
        root.singleton = factory();
    }
}(this, function() {
    'use strict';

    // Helper to check for arguments. Throws an error if passed in.
    var checkArguments = function (args) {
        if (args.length) {
            throw new Error('cannot pass arguments into an already instantiated singleton');
        }
    };

    return function (Class, options) {
        options || (options = {});

        // Wrapper around the class. Allows us to call new without generating an error.
        var WrappedClass = function() {
            if (!Class.instance) {
                // Proxy class that allows us to pass through all arguments on singleton instantiation.
                var F = function (args) {
                    return Class.apply(this, args);
                };

                // Extend the given class with a temporary function that sets the instance for future use.
                Class.prototype.__setInstance = function () {
                    Class.instance = this;
                };

                // Connect the proxy class to its counterpart class.
                F.prototype = Class.prototype;

                // Instantiate the proxy, passing through any arguments, then store the instance.
                (new F(arguments.length ? arguments : options.arguments)).__setInstance();

                // Remove the temporary instance setter function so we don't leave any rubbish lying around.
                delete Class.prototype.__setInstance;
            }
            else {
                // Make sure we're not trying to instantiate it with arguments again.
                checkArguments(arguments);
            }

            return Class.instance;
        };

        // Immediately instantiate the class.
        if (options.instantiate) {
            var instance = WrappedClass.apply(WrappedClass, options.arguments);

            // Return the instantiated class wrapped in a function so we can call it with new without generating an error.
            return function () {
                checkArguments(arguments);

                return instance;
            };
        }
        else {
            return WrappedClass;
        }
    };
}));