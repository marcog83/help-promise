/**
 * Created by mgobbi on 12/04/2017.
 */
export default function _has(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};