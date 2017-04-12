/**
 * Created by mgobbi on 11/04/2017.
 */
var assert = require("chai").assert;
import of from "../src/of";
import fromCallback from "../src/from-callback";
import equals from "../src/equals";
describe('Setoid', () => {
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
    it("reflexivity - a.equals(a) === true", done => {
        equals(a, a).then(result => {
            assert.isTrue(result);
            done();
        }).catch(done);
    });
    it("symmetry - a.equals(b) === b.equals(a)", done => {
        Promise.all([
            equals(a, b)
            , equals(b, a)
        ]).then(([left, right]) => {
            assert.isTrue(left && right);
            done();
        }).catch(done);
    });
    it("transitivity - a.equals(b) and b.equals(c), then a.equals(c)", done => {
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