describe('Singleton', function() {

    var MyClass,
        spy;

    beforeEach(function() {
        spy = {
            initialize: function () {}
        };

        MyClass = function (data) {
            var data = data,
                foo = 'foo';

            this.bar = 'bar';
            this.initialize = spy.initialize;
            this.initialize.apply(this, arguments);

            this.get = function (key) {
                return data[key];
            };

            this.getFoo = function () {
                return foo;
            };
        };

        spyOn(spy, 'initialize');
    });

    it('should create a lazily-instantiated singleton from a given class', function() {
        var MySingleton = singleton(MyClass);

        expect(spy.initialize.calls.count()).toEqual(0);

        var S1 = new MySingleton();

        expect(spy.initialize.calls.count()).toEqual(1);

        var S2 = new MySingleton();

        expect(spy.initialize.calls.count()).toEqual(1);

        expect(typeof MySingleton).toBe('function');
        expect(typeof S1).toBe('object');
        expect(S1).toEqual(S2);
    });

    it('should create a lazily-instantiated singleton with preset arguments', function() {
        var MySingleton = singleton(MyClass, {
            arguments: [
                {
                    foo: 'bar'
                }, {
                    flip: 'flop'
                }
            ]
        });

        new MySingleton();

        expect(typeof MySingleton).toBe('function');
        expect(spy.initialize).toHaveBeenCalled();
        expect(spy.initialize).toHaveBeenCalledWith({
            foo: 'bar'
        }, {
            flip: 'flop'
        });
    });

    it('should correctly maintain scope within the singleton', function() {
        var MySingleton = singleton(MyClass);

        var S = new MySingleton({
            flip: 'flop'
        });

        expect(S.bar).toBe('bar');
        expect(S.getFoo()).toBe('foo');
    });

    it('should throw an error when attempting to pass in arguments to an already instantiated singleton', function() {
        var MySingleton = singleton(MyClass);

        new MySingleton();

        expect(function() {
            new MySingleton(true);
        }).toThrow();
    });

    it('should create an immediately-instantiated singleton from a given class', function() {
        var MySingleton = singleton(MyClass, {
            instantiate: true
        });

        expect(spy.initialize.calls.count()).toEqual(1);

        var S1 = new MySingleton();

        expect(spy.initialize.calls.count()).toEqual(1);

        var S2 = new MySingleton();

        expect(spy.initialize.calls.count()).toEqual(1);

        expect(typeof MySingleton).toBe('function');
        expect(S1).toEqual(S2);
    });

    it('should create an immediately-instantiated singleton with preset arguments', function() {
        var MySingleton = singleton(MyClass, {
            instantiate: true,
            arguments: [
                {
                    foo: 'bar'
                }, {
                    flip: 'flop'
                }
            ]
        });

        expect(spy.initialize).toHaveBeenCalledWith(
            {
                foo: 'bar'
            }, {
                flip: 'flop'
            }
        );

        var S = new MySingleton();

        expect(typeof MySingleton).toBe('function');
        expect(S.get('foo')).toBe('bar');
    });
});