/**
 * Created by mgobbi on 12/04/2017.
 */
import {isZero} from "./zero";
import curry from "../internal/_curry";
import of from "./of";
const _then = curry((fn, x) => {
    return isZero(x) ? fn(x) : of(x).then(fn);
});
export var map = _then;
export var then = _then;
export var bind = _then;

