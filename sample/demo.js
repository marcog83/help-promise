var compose = pall.compose;
var tap = pall.tap;
var map = pall.map;
var of = pall.of;
var filter = pall.filter;
var concat = pall.concat;
var ap = pall.ap;


var composed = compose(
    tap(x => console.log("tap =>","just a sec...", x))

    , map(x => {
        console.log("map =>","Hello, " + x + "!");
        return "Hello, " + x + "!";
    })
    , filter(x => {
        console.log("filter =>","I won't speak to Bob",x !== "Bob");
        return x !== "Bob";
    })
    , of
);
composed("Bob").then(x => console.log(x));
composed("John").then(x => console.log(x));


//
// var a = of(123),
//     b = of(["abc", 2, 3]),
//     c = of([{a: 1, b: 2, c: 3}]);
//
// var left = concat(concat(a, b), c);
// var right = concat(a, concat(b, c));
// left.then(x => console.log("left", x));
// right.then(x => console.log("right", x));
//
// /**
//  */
// var renderPage = function (destinations) {
//     return function (events) {
//         return `<div>some page with ${destinations} and ${events}</div>`
//     }
// };
//
// var p1 = ap(of(renderPage), of('/destinations'));
// ap(p1, of('/events')).then(response => {
//     console.log(response);
// })