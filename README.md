# pall
## Installation
```
npm install pall
```
## Usage
```javascript 
import {compose,tap,map} from "pall";

var composed=compose(
    tap(x=>console.log("side effect!!!",x))
    ,map(x=>`Hello, ${x}!`)
    ,of
)
composed("Bob").then(result=>console.log(result)) 
composed("John").then(result=>console.log(result))

// side effect!!! Hello Bob! 
// side effect!!! Hello John!
// Hello Bob!  
// Hello John!
```


