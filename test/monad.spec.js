/**
 * Created by mgobbi on 11/04/2017.
 */
import {bind, equals, of} from "../promise-lib";
var assert = require("chai").assert;
describe("Monad", () => {
    // Expected values for validation
    var a = {name: 'a'};
    var b = {name: 'b'};

    // Simple test functions
    function f() {
        return a;
    }

    function g() {
        return b;
    }

// Simple helper to produce a monadic value *without* using unit()
    function m(x) {
        return Promise.resolve(x);
    }

    it("Law 1 - f bound to unit(a) == f(a) (unit a >>= f == f)", done => {
        var leftResult = bind(f, of(a));
        var rightResult = f(a);
        equals(leftResult, rightResult).then(result => {
            assert.isTrue(result);

            done();
        }).catch(done);
    });
    it("Law 2 - unit bound to promise value == promise value ( m >>= unit == m)", done => {
        var leftResult = bind(of, m(a));

        var rightResult = m(a);
        equals(leftResult, rightResult).then(result => {
            assert.isTrue(result);
            done();
        }).catch(done);
    });
    it("Law 3 - promise function composition is associative (m >>= f) >>= g == m >>= (x -> f x >>= g)", done => {
        var leftResult = bind(g, bind(f, m(a)));
        var rightResult = bind(x => {
            return bind(g, f(x));
        }, m(a));
        equals(leftResult, rightResult).then(result => {
            assert.isTrue(result);
            done();
        }).catch(done);

    });
});