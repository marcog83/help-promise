/**
 * Created by mgobbi on 17/03/2017.
 */
import never from "./Never";
var zero = never();

export var isZero = p => {
    return p === zero;
};
export var ZERO = zero;

