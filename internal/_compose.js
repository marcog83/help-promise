/**
 * Created by mgobbi on 17/03/2017.
 */
// Performs left-to-right composition of one or more Promise-returning functions.
import of from "../src/of";
export default function (...fns) {
    var ctx = this;
    fns.reverse();
    var head = fns[0];
    var tail = fns.slice(1);

    return function (...args) {
        return tail.reduce(function (acc, fn) {
            return of(acc).then(function (x) {
                return fn.call(ctx, x);
            })
        }, head.apply(ctx, args));
    }
};