/**
 * Created by mgobbi on 11/04/2017.
 */
// import {alt, bind, compose, concat, equals, filter, fromCallback, map, of, ZERO} from "../promise-lib";
import alt from "../src/alt";
import of from "../src/of";
import {map} from "../src/then-map-bind";
import {zero} from "../src/zero";
import equals from "../src/equals";
var assert = require("chai").assert;
describe("Plus", () => {
    var x, _zero, f;
    beforeEach(() => {
        x = of(4);
        _zero = zero();
        f = a => a;
    });
    it("Right identity - alt(a, zero()) ≡ a", done => {
        equals(alt(x, _zero), x).then(result => {
            assert.isTrue(result);
            done();
        });
    });
    it("Left identity - alt(zero(), a) ≡ a", done => {
        equals(alt(_zero, x), x).then(result => {
            assert.isTrue(result);
            done();
        });
    });
    it("Annihilation - map(f, zero()) ≡ zero()", done => {
        equals(map(f, _zero), _zero).then(result => {
            assert.isTrue(result);
            done();
        })
    });
});