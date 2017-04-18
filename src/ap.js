/**
 * Created by mgobbi on 12/04/2017.
 */
import curry from "../internal/_curry";
function ap(funcPromise, valuePromise) {
    return Promise.all([funcPromise, valuePromise])
        .then(([func, value]) => {
            return func(value);
        })
}
export default curry(ap);