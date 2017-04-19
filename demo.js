/**
 * Created by mgobbi on 18/04/2017.
 */
var compose = _p.default.compose;
var tap = _p.default.tap;
var map = _p.default.map;
var of = _p.default.of;
var composed = compose(
    tap(x => console.log("side effect!!!",x))
    , map(x => "Hello, "+x+"!")
    , of
);

composed("Bob").then(x => console.log(x));
composed("John").then(x => console.log(x));