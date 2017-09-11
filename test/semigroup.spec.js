/**
 * Created by mgobbi on 12/04/2017.
 */
import {assert} from "chai";
import of from "../src/of";
import concat from "../src/concat";
import equals from "../src/equals";
describe("Semigroup - concat :: Semigroup s => Type s ~> (s, s) → s", () => {
    var a, b, c;
    beforeEach(() => {
        a = of(123);
        b = of("abc");
        c = of({a: 1, b: 2, c: 3});
    });
    it("Associativity: concat(concat(a, b), c) ≡ concat(a, concat(b, c))", done => {
        var left = concat(concat(a, b), c);
        var right = concat(a, concat(b, c));
        equals(left, right).then(result => {
            assert.isTrue(result);
            done();
        })
    })
});