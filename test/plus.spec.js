/**
 * Created by mgobbi on 11/04/2017.
 */
import {alt, bind, compose, concat, equals, filter, fromCallback, map, of, ZERO} from "../promise-lib";
var assert = require("chai").assert;
describe("Plus",()=>{
    var x,_zero,f;
    beforeEach(()=>{
         x = of(4);
         _zero = ZERO;
         f = a => a;
    });
    it("right identity - x.alt(A.zero()) is equivalent to x",done=>{
        equals(alt(x, _zero), x).then(result => {
            assert.isTrue(result);
            done();
        });
    });
    it("left identity - A.zero().alt(x) is equivalent to x",done=>{
        equals(alt(_zero, x), x).then(result => {
            assert.isTrue(result);
            done();
        });
    });
    it("annihilation - A.zero().map(f) is equivalent to A.zero()",done=>{
        equals(map(f, _zero), _zero).then(result => {
            assert.isTrue(result);
            done();
        })
    });
});