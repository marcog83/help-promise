/**
 * Created by mgobbi on 11/04/2017.
 */
var assert = require("chai").assert;
import of from "../src/of";
import fromCallback from "../src/from-callback";
import equals from "../src/equals";
describe('Setoid - equals :: Setoid s => Type s ~> (s, s) → Boolean', () => {
    var a, b, c;
    beforeEach(() => {
        a = of({a: 1});
        b = fromCallback(function (resolve) {
            setTimeout(() => {
                resolve({a: 1});
            }, 300)
        });
        c = of({a: 1});
    });
    it("Reflexivity - equals(a, a) === true", done => {
        equals(a, a).then(result => {
            assert.isTrue(result);
            done();
        }).catch(done);
    });
    it("Symmetry - equals(a, b) === equals(b, a)", done => {
        Promise.all([
            equals(a, b)
            , equals(b, a)
        ]).then(([left, right]) => {
            assert.isTrue(left && right);
            done();
        }).catch(done);
    });
    it("Transitivity - if equals(a, b) and equals(b, c), then equals(a, c)", done => {
        Promise.all([
            equals(a, b)
            , equals(b, c)
            , equals(a, c)
        ]).then(([ab, bc, ac]) => {
            assert.isTrue(ab && bc && ac);
            done();
        }).catch(done);
    });
});