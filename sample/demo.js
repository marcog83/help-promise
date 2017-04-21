var compose = pall.compose;
var tap = pall.tap;
var map = pall.map;
var of = pall.of;
var filter = pall.filter;
var concat = pall.concat;


var composed = compose(
    tap(x => console.log("side effect!!!", x))

    , map(x => "Hello, " + x + "!")
    , filter(x => x != "Bob")
    , of
);


composed("Bob").then(x => console.log(x));
composed("John").then(x => console.log(x));

var a = of(123),
    b = of(["abc",2,3]),
    c = of([{a: 1, b: 2, c: 3}]);

var left = concat(concat(a, b), c);
var right = concat(a, concat(b, c));
left.then(x=>console.log("left",x));
right.then(x=>console.log("right",x));