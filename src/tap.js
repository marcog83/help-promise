/**
 * Created by mgobbi on 19/04/2017.
 */
import curry from "../internal/_curry";
export default curry((fn, p) => {
    fn(p);
    return p;
})