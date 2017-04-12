/**
 * Created by mgobbi on 11/04/2017.
 */

import of from "../src/of";
import {map} from "../src/then-map-bind";
import equals from "../src/equals";
var assert = require("chai").assert;
describe("Functor", () => {
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
    it("identity - u.map(a => a) is equivalent to u", done => {
        equals(map(u, a), a)
            .then(result => {
                assert.isTrue(result);
                done();
            });
    });
    it("composition - u.map(x => f(g(x))) is equivalent to u.map(g).map(f)", done => {
        equals(map(u, a), a)
            .then(result => {
                assert.isTrue(result);
                done();
            });
    });
});