/**
 * Created by mgobbi on 11/04/2017.
 */
import of from "../src/of";
import {bind} from "../src/then-map-bind";
import equals from "../src/equals";
import {assert} from "chai";
describe("Associativity", () => {
    it("(m >>= f) >>= g == m >>= (\\x -> f x >>= g)", done => {
        var f = a => a * a;
        var g = a => a - 6;
        var m = of(7);
        var left = bind(g, bind(f, m));
        var right = bind(x => bind(g, of(f(x))), m);
        equals(left, right).then(result => {
            assert.isTrue(result);
            done();
        });
    });

});