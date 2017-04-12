/**
 * Created by mgobbi on 12/04/2017.
 */
import never from "./never";
import curry from "../internal/_curry";
import compose from "../internal/_compose";
import {map} from "./then-map-bind";
export default curry((fn, promise) => compose(
    map(([filtered, value]) => filtered ? value : never())
    , map(x => [fn(x), x])
)(promise));