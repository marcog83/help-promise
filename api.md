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
## bind
## map
## tap
## then

## filter
## equals