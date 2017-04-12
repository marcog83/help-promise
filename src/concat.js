/**
 * Created by mgobbi on 17/03/2017.
 */
/**
 ### Semigroup
 1. `a.concat(b).concat(c)` is equivalent to `a.concat(b.concat(c))` (associativity)

 **/
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
function _concatenating(reducing) {

    reducing = reducing || function (xs, x) {
            return xs.concat(x)
        };
    return function (...promises) {
        return Promise.all(promises).then(([head, ...tail]) => {
            return tail.reduce(reducing, head);
        });
    }
}
export var concatenating = _concatenating;
export var concat = function (...promises) {
    return Promise.all(promises).then(function (results) {
        var _flat=flatten(results);
        // var head = _flat[0];
        // var tail = _flat.slice(1);
        return results.reduce(function (xs, x) {
            return xs.concat(x);
        }, []);
    })
};


//_concatenating((xs, x) => xs.concat(x));