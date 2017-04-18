/**
 * Created by mgobbi on 12/04/2017.
 */
import ap from "../src/ap";
import of from "../src/of";
import equals from "../src/equals";
let assert = require("chai").assert;
describe("Applicative - of :: Applicative f => Type f ~> a → f a", () => {
    let v, f, x,   y;
    beforeEach(() => {
        v = of(1234);
        f = x => x - 1000;
        x = 1001;

    });
    it("Identity - ap(of(x => x), v) ≡ v", done => {
        let left = ap(of(x => x), v);
        equals(left, v).then(result => {
            assert.isTrue(result);
            done();
        }).catch(done);
    });
    it("Homomorphism - ap(of(f), of(x)) ≡ of(f(x))", done => {
        let left = ap(of(f), of(x));
        let right = of(f(x));
        equals(left, right).then(result => {
            assert.isTrue(result);
            done();
        }).catch(done);
    });
    it("Interchange: ap(f, of(x)) ≡ ap(of(func => func(x)), f)", done => {
        let left = ap(f, of(x));
        let right = ap(of(func => func(x)), f);
        equals(left, right).then(result => {
            assert.isTrue(result);
            done();
        }).catch(done);
    })
});


