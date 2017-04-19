
var compose = pall.compose;
var tap = pall.tap;
var map = pall.map;
var of = pall.of;
var filter = pall.filter;


var composed = compose(
    tap(x => console.log("side effect!!!", x))

    , map(x => "Hello, " + x + "!")
    , filter(x =>x != "Bob")
    , of
);


composed("Bob").then(x => console.log(x));
composed("John").then(x => console.log(x));

