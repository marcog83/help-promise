1. Creating Promise
    * [concat](#concat)	
	* [fromCallback](#fromCallback)	
	* [never](#never)	 
	* [of](#of)
	* [zero](#zero)	 
1. Transforming Promises
	* [alt](#alt)
	* [ap](#ap)
	* [bind](#bind)	
	* [map](#map)
	* [tap](#tap)
	* [then](#then)
1. Filtering  Promises
	* [filter](#filter)
1. Compare  Promises
	* [equals](#equals)


## concat
Create a new promise that returns an array of all the results of promises.
### example
```javascript
var  a = of(123),
     b = of("abc"),
     c = of({a: 1, b: 2, c: 3});
     
var left=concat(concat(a, b), c);
 
left.then(x => {
       console.log(x)//[123, "abc", {a: 1, b: 2, c: 3}];
    })
```
## fromCallback
Create a new promise from a function. the function is the parameter passed into Promise constructor.
```javascript
fromCallback((resolve,reject)=>{
    setTimeout(resolve,1000,"Hello World");
}).then(x=>{
    console.log(x)//Hello World
})
```

## never
Create a promise that never resolve or reject
```javascript
never().then(x=>{
    //it never happens!!!
}).catch(x=>{
      //it never happens!!!
  });
```
## of
Create a new Promise from a value.
```javascript
of(42).then(x=>{    
    console.log(x);//42
})
```
## zero
it is a special Promise that acts as an empty Promise.
```javascript
of(42).then(x=>{    
    console.log(x);//42
})
```

 
## alt
Create a promise that resolve or reject the first promise that will be resolved/rejected. (Promise.race)
```

var a=fromCallback(r=>setTimeout(r(1),1000));
var b=of(42);
alt(a,b).then(x=>{
console.log(x)//42
})
```

## ap
Applicative law
```
var renderPage = function(destinations){
    return function(events){
         return `<div>some page with ${destinations} and ${events}</div>`
    }
};

var p1=ap(of(renderPage),of('destinations'));
ap(p1,of('events')).then(response => {
                        console.log(response);
                        //<div>some page with destinations and events</div>
                    })
```
## bind
## map
## then
Functor  
map(fn, x)
return Promise x
```
map(x=>x+1,of(3)) 
.then(response=>{
    console.log(response)//4
})
```
## tap
tap(fn, x)
return Promise x;
```
 tap(x=>console.log(x),of(3))
.then(response=>{
    console.log(response)//3
})
```
## filter
Filter over a predicate function
filter(fn, x)
return Promise x
```

filter(x => x != "Bob",of("Bob"))
.then(r=>{
    // never happens
});

filter(x => x != "Bob",of("John"))
.then(r=>{
    // r=="John"
})
```
## equals