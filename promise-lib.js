/**
 * Created by mgobbi on 10/03/2017.
 */

import curry from "./curry";
import compose from "./compose";
import equals from "./equals";
import of from "./of";
import never from "./never";
import {isZero, ZERO} from "./zero";
import {concat, concatenating} from "./concat";


var fromCallback = fn => new Promise(fn);


var then = curry((fn, x) => {
    return isZero(x) ? fn(x) : of(x).then(fn);
});
var bind = then;
var map = then;


var alt = (p1, p2) => {
    if (isZero(p1))return p2;
    if (isZero(p2))return p1;
    return Promise.race([p1, p2]);
};


var filter = curry((fn, promise) => compose(
    map(([filtered, value]) => filtered ? value : never())
    , map(x => [fn(x), x])
)(promise));


export  {
    compose
    , equals
    , concat
    , concatenating
    , of
    , fromCallback
    , then
    , bind
    , map
    , filter
    , alt
    , ZERO
}




