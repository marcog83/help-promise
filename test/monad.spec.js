/**
 * Created by mgobbi on 11/04/2017.
 */
import of from "../src/of";
import {bind} from "../src/then-map-bind";
import equals from "../src/equals";
import {assert} from "chai";
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

    it("Left identity: bind(f, of(a)) ≡ f(a)", done => {
        var leftResult = bind(f, of(a));
        var rightResult = f(a);
        equals(leftResult, rightResult).then(result => {
            assert.isTrue(result);

            done();
        }).catch(done);
    });
    it("Right identity: bind(of, u) ≡ u", done => {
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