/**
 * Created by mgobbi on 11/04/2017.
 */

import of from "../src/of";
import {map} from "../src/then-map-bind";
import equals from "../src/equals";
import {assert} from "chai";
describe("Functor - map :: Functor f => Type f ~> (a → b, f a) → f b", () => {
    var a;
    var f;
    var g;
    var u;
    beforeEach(() => {
        a = of("a");
        f = a => a + "f";
        g = a => a + "g";
        u = a => a;
    });
    it("Identity - map(x => x, a) ≡ a", done => {
        equals(map(u, a), a)
            .then(result => {
                assert.isTrue(result);
                done();
            });
    });
    it("Composition - map(x => f(g(x)), a) ≡ map(f, map(g, a))", done => {
        equals(map(x => f(g(x)), a), map(f, map(g, a)))
            .then(result => {
                assert.isTrue(result);
                done();
            });
    });
});