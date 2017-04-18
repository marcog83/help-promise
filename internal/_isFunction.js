/**
 * Created by mgobbi on 18/04/2017.
 */
export default  function _isFunction(x) {
    return Object.prototype.toString.call(x) === '[object Function]';
};