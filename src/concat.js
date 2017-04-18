/**
 * Created by mgobbi on 17/03/2017.
 */
/**
 ### Semigroup
 1. `a.concat(b).concat(c)` is equivalent to `a.concat(b.concat(c))` (associativity)

 **/
import flatten from "../internal/_flatten";

export default (left, right) => {
    return Promise.all([left, right]).then((results) => {
        let _flat = flatten(results);
        return _flat.reduce((xs, x) => {
            return xs.concat(x);
        }, []);
    })
};
