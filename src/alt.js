/**
 * Created by mgobbi on 12/04/2017.
 */
import {isZero} from "./zero";
import curry from "../internal/_curry";
export default  curry((p1, p2) => {
    if (isZero(p1))return p2;
    if (isZero(p2))return p1;
    return Promise.race([p1, p2]);
});