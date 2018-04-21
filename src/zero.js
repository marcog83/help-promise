/**
 * Created by mgobbi on 17/03/2017.
 */

const ZERO = Promise.resolve(Symbol("zeroPromise"));

export var isZero = p => {
    return p === ZERO;
};
export var zero = () => ZERO;

