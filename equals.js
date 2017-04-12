/**
 * Created by mgobbi on 17/03/2017.
 */
/*
 ### Setoid

 */
import {isZero} from "./zero";
import of from "./of";
export default (p1, p2) => {
    if (isZero(p1) && isZero(p2)) {
        return of(true);
    }
    if (!isZero(p1) && !isZero(p2)) {
        return Promise.all([p1, p2])
            .then(([left, right]) => {
                return left === right;
            })
    }
    return of(false);
};