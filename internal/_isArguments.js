/**
 * Created by mgobbi on 12/04/2017.
 */
import _has from "./_has";


export default (function () {
    var toString = Object.prototype.toString;
    return toString.call(arguments) === '[object Arguments]' ?
        function _isArguments(x) {
            return toString.call(x) === '[object Arguments]';
        } :
        function _isArguments(x) {
            return _has('callee', x);
        };
}());