/**
 * Created by mgobbi on 17/03/2017.
 */

const _zero = Promise.resolve(false);

export var isZero = p => {
    return p === _zero;
};
export var zero = () => _zero;

