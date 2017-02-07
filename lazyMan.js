var LazyMan = (function (name) {
    var tasks = [];
    var self = this;

    var next = function () {
        var fn = tasks.shift();
        fn && fn();
    };

    var fn = (function (n) {
        var name = n;
        return function () {
            console.log("Hi! this is " + name + "!");
            next();
        }
    })(name);

    tasks.push(fn);
    setTimeout(next, 0)

    var eat = function (name) {
        var fn = (function (name) {
            return function () {
                console.log("Eat " + name + "~");
                next();
            }
        })(name)
        tasks.push(fn);
        return this;
    }

    var sleep = function (time) {
        var fun = (function (time) {
            return function () {
                setTimeout(function () {
                    console.log("Wake up after " + time + "s!");
                    next();
                });
            }
        })(time);

        tasks.push(fun);

        return this;
    }

    var sleepFirst = function(time) {
        var fn = (function() {
            setTimeout(function() {
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        })(time);
        this.tasks.unshift(fn);
        return this;
    }

    return {
        eat: eat,
        sleep: sleep
    }
});

var l = new LazyMan("Neal").sleep(5).eat("Lunch");