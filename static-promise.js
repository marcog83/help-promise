import {alt, bind, compose, concat, equals, filter, fromCallback, map, of, zero} from "./promise-lib";
//

var results = document.querySelector("#results");
function message(title, text) {
    var div = document.createElement("div");
    div.innerHTML = `<h4>${title}</h4><p>${text}</p>`;
    results.appendChild(div);
}
(function () {
    /**
     ### Setoid
     1. `a.equals(a) === true` (reflexivity)
     2. `a.equals(b) === b.equals(a)` (symmetry)
     3. If `a.equals(b)` and `b.equals(c)`, then `a.equals(c)` (transitivity)
     **/
    var a = of("equals");
    var b = fromCallback(function (resolve) {
        setTimeout(() => {
            resolve("equals");
        }, 2000)
    });
    var c = of("equals");

    equals(a, a).then(result => {
        if (result) {
            message("Setoid - reflexivity", 'a.equals(a) === true');
          //  console.log('a.equals(a) === true (reflexivity)')
        }
    });
    Promise.all([
        equals(a, b)
        , equals(b, a)
    ]).then(([left, right]) => {
        if (left && right) {
            message("Setoid - symmetry", 'a.equals(b) === b.equals(a)');
            //console.log("a.equals(b) === b.equals(a) (symmetry)")
        }
    });

    Promise.all([
        equals(a, b)
        , equals(b, c)
        , equals(a, c)
    ]).then(([ab, bc, ac]) => {
        if (ab && bc && ac) {
            message("Setoid - transitivity", 'a.equals(b) and b.equals(c), then a.equals(c)');
            //console.log("`a.equals(b)` and `b.equals(c)`, then `a.equals(c)` (transitivity)")
        }
    });

})();

(function () {

    // Expected values for validation
    var a = {name: 'a'};
    var b = {name: 'b'};

// Simple test functions
    function f() {
        return a;
    }

    function g() {
        return b;
    }

    // Monad
    /*
     M.of(a).chain(f) is equivalent to f(a) (left identity)
     m.chain(M.of) is equivalent to m (right identity)
     */

    var leftResult = bind(f, of(a));

    var rightResult = f(a);

    equals(leftResult, rightResult).then(result => {
        if (result) {
            message("Monad - Law 1", 'unit a >>= f == f');
            // console.log('Law 1: unit a >>= f == f')
        } else {
            message("Monad - Law 1", 'failed');
            console.log("NUOOO!!!")
        }
    });

//-------------------------------------------------------------
// Law 2
// m >>= unit == m
// unit bound to promise value == promise value

    leftResult = bind(of, of(a));

    rightResult = of(a);

    equals(leftResult, rightResult).then(result => {
        if (result) {
            message("Monad - Law 2", 'm >> = unit == m');
            // console.log('Law 2: m >>= unit == m')
        } else {
            message("Monad - Law 2", 'failed');
            console.log("NUOOO!!!")
        }
    });

//-------------------------------------------------------------
// Law 3
// (m >>= f) >>= g == m >>= (\x -> f x >>= g)
// Or, perhaps more simply: (f >=> g) >=> h == f >=> (g >=> h)
// promise function composition is associative

    leftResult = bind(g, bind(f, of(a)));


//

    rightResult = bind(x => bind(g, of(f(x))), of(a));

    equals(leftResult, rightResult).then(result => {
        if (result) {
            message("Monad - Law 3", '(m >>= f) >>= g == m >>= (\\x -> f x >>= g)');
            // console.log('Law 3: (m >>= f) >>= g == m >>= (\\x -> f x >>= g)');
        }
    });
})();


(function () {
    //Associativity
    var f = a => a * a;
    var g = a => a - 6;
    var m = of(7);
    var left = bind(g, bind(f, m));
    var right = bind(x => bind(g, of(f(x))), m);
    equals(left, right).then(result => {
        if (result) {
            message("Associativity", '(m >>= f) >>= g == m >>= (\\x -> f x >>= g)');
            // console.log('Associativity: (m >>= f) >>= g == m >>= (\\x -> f x >>= g)');
        }
    });
}());


// const mapping = (f) =>
//     (reducing) =>
//         (result, input) =>
//             reducing(result, f(input));

/**
 * ### parentesi transducer ###
 * @param predicate
 * @returns {Function}

 const filtering = function (predicate) {
    return function (reducing) {
        return function (result, input) {
            return predicate(input) ? reducing(result, input) : result;
        }
    }
};

 var mapping = function (f) {
    return function (reducing) {
        return function (result, input) {
            return reducing(result, f(input))
        }
    }
};

 var xform = mapping(x=>x + 1);
 var reducing = (xs, x) => {
    xs.push(x);
    return xs;
};
 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(xform(reducing), []);

 const transduce = (xform, reducing, initial, input) => reduce(xform(reducing), initial,input);
 */

(function () {

    var a = of(1);
    var b = of("a");
    var c = of(true);
    var left = concat(concat(a, b), c).then(r => {
        console.log("left", r);
        return r;
    });
    var right = concat(a, concat(b, c)).then(r => {
        console.log("right", r);
        return r;
    });
    equals(left, right).then(result => {
        if (result) {
            message("concat", 'a.concat(b).concat(c)` is equivalent to `a.concat(b.concat(c))');
           // console.log('a.concat(b).concat(c)` is equivalent to `a.concat(b.concat(c))');
        } else {
            message("concat", 'NUOOOO');
            console.log("NUOOOO")
        }
    }).catch(console.log.bind(console));

})();

(function () {
    /*
     Functor
     u.map(a => a) is equivalent to u (identity)
     u.map(x => f(g(x))) is equivalent to u.map(g).map(f) (composition) // map(f,map(g,u))
     */

    var a = of("a");
    var f = a => a + "f";
    var g = a => a + "g";
    var u = a => a;

    equals(map(u, a), a)
        .then(result => {
            if (result) {
                message("Functor - identity", 'map(x => x, a) ≡ a');
                // console.log("Identity: map(x => x, a) ≡ a")
            } else {
                message("Functor - identity", 'nuooo');
                console.log("nuooo Identity")
            }
        });
//
    equals(map(x => f(g(x)), a), map(f, map(g, a)))
        .then(result => {
            if (result) {
                message("Functor - composition", 'map(x => f(g(x)), a) ≡ map(f, map(g, a))');
              //  console.log("Composition: map(x => f(g(x)), a) ≡ map(f, map(g, a))")
            } else {
              //  console.log("nuooo Composition")
            }
        });
    /*
     Functor - end
     */
})();

(function () {
    var a = of(4);
    var b = of(5);

    function predicate(value) {
        return value < 5;
    }

    filter(predicate, a).then(result => {
        message("filter", 'filter OK');
        console.log("filter passato", result)
    });
    filter(predicate, b).then(result => {
        console.log("non dovrebbe mai scriverlo!!!", result);
        //meglio il reject???BOH!
    })
})();

(function () {
    /*
     Plus

     A value that implements the Plus specification must also implement the Alt specification.

     x.alt(A.zero()) is equivalent to x (right identity)
     A.zero().alt(x) is equivalent to x (left identity)
     A.zero().map(f) is equivalent to A.zero() (annihilation)
     */
    var x = of(4);
    var _zero = zero();
    var f = a => a;
    equals(alt(x, _zero), x).then(result => {
        if (result) {
            message("Plus - right identity", 'x.alt(A.zero()) is equivalent to x');
            // console.log("x.alt(A.zero()) is equivalent to x (right identity)")
        } else {
            console.log("nuooo right identity")
        }
    });
    equals(alt(_zero, x), x).then(result => {
        if (result) {
            message("Plus - left identity", 'A.zero().alt(x) is equivalent to x');
            console.log("A.zero().alt(x) is equivalent to x (left identity)")
        } else {
            console.log("nuooo left identity")
        }
    });
    // var map = (fn, x)=> of(x).then(fn);
    equals(map(f, _zero), _zero).then(result => {
        if (result) {
            message("Plus - annihilation", 'A.zero().map(f) is equivalent to A.zero()');
            console.log("A.zero().map(f) is equivalent to A.zero() (annihilation)")
        } else {
            console.log("nuooo annihilation")
        }
    })
})();

(function () {
    /*
     Compose
     */
    var composed = compose(
        x => Promise.resolve(x + " -> d")
        , x => Promise.resolve(x + " -> c")
        , x => x + " -> b"
    );
    composed("a").then(console.log.bind(console, "compose:"))

})();
