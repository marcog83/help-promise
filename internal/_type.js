/**
 * Created by mgobbi on 10/04/2017.
 */
export default (val) => {
    return val === null ? 'Null' :
        val === undefined ? 'Undefined' :
            Object.prototype.toString.call(val).slice(8, -1);
}