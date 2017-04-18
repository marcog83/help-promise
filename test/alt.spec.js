/**
 * Created by mgobbi on 12/04/2017.
 */
import fromCallback from "../src/from-callback";
import of from "../src/of";
import alt from "../src/alt";
import equals from "../src/equals";
import {map} from "../src/then-map-bind";
var assert = require("chai").assert;
describe("Alt - alt :: Alt f => Type f ~> (f a, f a) → f a", () => {
    var a, b, c;
    var f = _ => _;
    beforeEach(() => {
        a = of(4);
        b = fromCallback(resolve => {
            setTimeout(_ => resolve("asd"), 10)
        });
        c = fromCallback(resolve => {
            setTimeout(_ => resolve({a: 1}), 100)
        });

    });
    it("Associativity - alt(alt(a, b), c) ≡ alt(a, alt(b, c))", done => {
        var left = alt(alt(a, b), c);
        var right = alt(a, alt(b, c));
        equals(left, right).then(result => {
            assert.isTrue(result);
            done();
        }).catch(done);
    });
    it("Distributivity: map(f, alt(a, b)) ≡ alt(map(f, a), map(f, b))", done => {
        var left = map(f, alt(a, b));
        var right = alt(map(f, a), map(f, b));
        equals(left, right).then(result => {
            assert.isTrue(result);
            done();
        }).catch(done);
    })
});