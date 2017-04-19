(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('pall', ['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.pall = mod.exports;
    }
})(this, function (module, exports) {
    (function (global, factory) {
        if (typeof define === "function" && define.amd) {
            define('pall', ['module', 'exports'], factory);
        } else if (typeof exports !== "undefined") {
            factory(module, exports);
        } else {
            var mod = {
                exports: {}
            };
            factory(mod, mod.exports);
            global.pall = mod.exports;
        }
    })(this, function (module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _slicedToArray = function () {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = undefined;

                try {
                    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);

                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        if (!_n && _i["return"]) _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }

                return _arr;
            }

            return function (arr, i) {
                if (Array.isArray(arr)) {
                    return arr;
                } else if (Symbol.iterator in Object(arr)) {
                    return sliceIterator(arr, i);
                } else {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
            };
        }();

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        /**
         * Created by mgobbi on 14/03/2017.
         */
        function curry(fn) {
            var arity = fn.length;

            return function resolver() {
                var memory = Array.prototype.slice.call(arguments);
                return function () {
                    var local = memory.slice(),
                        next;
                    Array.prototype.push.apply(local, arguments);
                    next = local.length >= arity ? fn : resolver;
                    return next.apply(null, local);
                };
            }();
        }

        /**
         * Created by mgobbi on 17/03/2017.
         */
        var of = curry(function (x) {
            return Promise.resolve(x);
        });

        /**
         * Created by mgobbi on 17/03/2017.
         */
        // Performs left-to-right composition of one or more Promise-returning functions.
        var compose = function compose() {
            var ctx = this;

            for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
                fns[_key] = arguments[_key];
            }

            fns.reverse();
            var head = fns[0];
            var tail = fns.slice(1);

            return function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return tail.reduce(function (acc, fn) {
                    return of(acc).then(function (x) {
                        return fn.call(ctx, x);
                    });
                }, head.apply(ctx, args));
            };
        };

        /**
         * Created by mgobbi on 17/03/2017.
         */

        var _zero = Promise.resolve(false);

        var isZero = function isZero(p) {
            return p === _zero;
        };
        var zero = function zero() {
            return _zero;
        };

        /**
         * Created by mgobbi on 12/04/2017.
         */
        function _arrayFromIterator(iter) {
            var list = [];
            var next;
            while (!(next = iter.next()).done) {
                list.push(next.value);
            }
            return list;
        }

        /**
         * Created by mgobbi on 12/04/2017.
         */
        function _functionName(f) {
            // String(x => x) evaluates to "x => x", so the pattern may not match.
            var match = String(f).match(/^function (\w*)/);
            return match == null ? '' : match[1];
        }

        /**
         * Created by mgobbi on 12/04/2017.
         */
        function _has(prop, obj) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        /**
         * Created by mgobbi on 12/04/2017.
         */
        function identical(a, b) {
            // SameValue algorithm
            if (a === b) {
                // Steps 1-5, 7-10
                // Steps 6.b-6.e: +0 != -0
                return a !== 0 || 1 / a === 1 / b;
            } else {
                // Step 6.a: NaN == NaN
                return a !== a && b !== b;
            }
        }

        /**
         * Created by mgobbi on 12/04/2017.
         */
        var _isArguments = function () {
            var toString = Object.prototype.toString;
            return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
                return toString.call(x) === '[object Arguments]';
            } : function _isArguments(x) {
                return _has('callee', x);
            };
        }();

        /**
         * Created by mgobbi on 12/04/2017.
         */

        /**
         * Returns a list containing the names of all the enumerable own properties of
         * the supplied object.
         * Note that the order of the output array is not guaranteed to be consistent
         * across different JS platforms.
         *
         * @func
         * @memberOf R
         * @since v0.1.0
         * @category Object
         * @sig {k: v} -> [k]
         * @param {Object} obj The object to extract properties from
         * @return {Array} An array of the object's own properties.
         * @example
         *
         *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
         */
        var keys = function () {
            // cover IE < 9 keys issues
            var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
            var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
            // Safari bug
            var hasArgsEnumBug = function () {
                'use strict';

                return arguments.propertyIsEnumerable('length');
            }();

            var contains = function contains(list, item) {
                var idx = 0;
                while (idx < list.length) {
                    if (list[idx] === item) {
                        return true;
                    }
                    idx += 1;
                }
                return false;
            };

            function keys_ok(obj) {
                return Object(obj) !== obj ? [] : Object.keys(obj);
            }

            function keys_enumsbug(obj) {
                if (Object(obj) !== obj) {
                    return [];
                }
                var prop, nIdx;
                var ks = [];
                var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
                for (prop in obj) {
                    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
                        ks[ks.length] = prop;
                    }
                }
                if (hasEnumBug) {
                    nIdx = nonEnumerableProps.length - 1;
                    while (nIdx >= 0) {
                        prop = nonEnumerableProps[nIdx];
                        if (_has(prop, obj) && !contains(ks, prop)) {
                            ks[ks.length] = prop;
                        }
                        nIdx -= 1;
                    }
                }
                return ks;
            }
            return typeof Object.keys === 'function' && !hasArgsEnumBug ? keys_ok : keys_enumsbug;
        }();

        /**
         * Created by mgobbi on 10/04/2017.
         */
        var type = function type(val) {
            return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
        };

        function _equals(a, b, stackA, stackB) {
            if (identical(a, b)) {
                return true;
            }

            if (type(a) !== type(b)) {
                return false;
            }

            if (a == null || b == null) {
                return false;
            }

            if (typeof a.equals === 'function' || typeof b.equals === 'function') {
                return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
            }

            switch (type(a)) {
                case 'Arguments':
                case 'Array':
                case 'Object':
                    if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
                        return a === b;
                    }
                    break;
                case 'Boolean':
                case 'Number':
                case 'String':
                    if (!((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b)) && identical(a.valueOf(), b.valueOf()))) {
                        return false;
                    }
                    break;
                case 'Date':
                    if (!identical(a.valueOf(), b.valueOf())) {
                        return false;
                    }
                    break;
                case 'Error':
                    return a.name === b.name && a.message === b.message;
                case 'RegExp':
                    if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
                        return false;
                    }
                    break;
                case 'Map':
                case 'Set':
                    if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
                        return false;
                    }
                    break;
                case 'Int8Array':
                case 'Uint8Array':
                case 'Uint8ClampedArray':
                case 'Int16Array':
                case 'Uint16Array':
                case 'Int32Array':
                case 'Uint32Array':
                case 'Float32Array':
                case 'Float64Array':
                    break;
                case 'ArrayBuffer':
                    break;
                default:
                    // Values of other types are only equal if identical.
                    return false;
            }

            var keysA = keys(a);
            if (keysA.length !== keys(b).length) {
                return false;
            }

            var idx = stackA.length - 1;
            while (idx >= 0) {
                if (stackA[idx] === a) {
                    return stackB[idx] === b;
                }
                idx -= 1;
            }

            stackA.push(a);
            stackB.push(b);
            idx = keysA.length - 1;
            while (idx >= 0) {
                var key = keysA[idx];
                if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
                    return false;
                }
                idx -= 1;
            }
            stackA.pop();
            stackB.pop();
            return true;
        }

        /**
         * Created by mgobbi on 17/03/2017.
         */
        /*
         ### Setoid
        
         */
        var equals = function equals(p1, p2) {
            if (isZero(p1) && isZero(p2)) {
                return of(true);
            }
            if (!isZero(p1) && !isZero(p2)) {
                return Promise.all([p1, p2]).then(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2),
                        left = _ref2[0],
                        right = _ref2[1];

                    return _equals(left, right, [], []); //left === right;
                });
            }
            return of(false);
        };

        /**
         * Created by mgobbi on 19/04/2017.
         */
        var tap = curry(function (fn, p) {
            fn(p);
            return p;
        });

        var NEVER = new Promise(function (_) {
            return _;
        });
        var never = function never() {
            return NEVER;
        };

        /**
         * Created by mgobbi on 12/04/2017.
         */
        var _then = curry(function (fn, x) {
            return isZero(x) ? fn(x) : of(x).then(fn);
        });
        var map = _then;
        var then = _then;
        var bind = _then;

        /**
         * Created by mgobbi on 12/04/2017.
         */
        var filter = curry(function (fn, promise) {
            return compose(map(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    filtered = _ref4[0],
                    value = _ref4[1];

                return filtered ? value : never();
            }), map(function (x) {
                return [fn(x), x];
            }))(promise);
        });

        /**
         * Created by mgobbi on 12/04/2017.
         */
        var fromCallback = function fromCallback(fn) {
            return new Promise(fn);
        };

        /**
         * Created by mgobbi on 12/04/2017.
         */
        var alt = curry(function (p1, p2) {
            if (isZero(p1)) return p2;
            if (isZero(p2)) return p1;
            return Promise.race([p1, p2]);
        });

        /**
         * Created by mgobbi on 12/04/2017.
         */
        var ap = curry(function ap(funcPromise, valuePromise) {
            return Promise.all([funcPromise, valuePromise]).then(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    func = _ref6[0],
                    value = _ref6[1];

                return func(value);
            });
        });

        /**
         * Created by mgobbi on 12/04/2017.
         */
        function flatten(arr) {
            return arr.reduce(function (flat, toFlatten) {
                return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);
        }

        /**
         * Created by mgobbi on 17/03/2017.
         */
        /**
         ### Semigroup
         1. `a.concat(b).concat(c)` is equivalent to `a.concat(b.concat(c))` (associativity)
        
         **/
        var concat = curry(function (left, right) {
            return Promise.all([left, right]).then(function (results) {
                var _flat = flatten(results);
                return _flat.reduce(function (xs, x) {
                    return xs.concat(x);
                }, []);
            });
        });

        /**
         * Created by mgobbi on 10/03/2017.
         */

        var helpPromise = {
            compose: compose,
            equals: equals,
            concat: concat,
            of: of,
            ap: ap,
            fromCallback: fromCallback,
            then: then,
            bind: bind,
            map: map,
            filter: filter,
            alt: alt,
            isZero: isZero,
            tap: tap,
            zero: zero
        };

        exports.default = helpPromise;
        module.exports = exports['default'];
    });
});
//# sourceMappingURL=help-promise.js.map