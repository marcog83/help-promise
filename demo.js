/**
 * Created by mgobbi on 18/04/2017.
 */
var _p = _p.default;
var composed = _p.compose(
    _p.tap(x => console.log(x))
    , _p.map(x => x + " mappato")
    , _p.of
);

composed("ciao").then(x => console.log("2", x));