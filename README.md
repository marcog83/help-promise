# pall
Pall add functionalities to Promise. It uses native Promise, following [static-land](https://github.com/rpominov/static-land) specification
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

## API

[see api docs](api.md)

## Contribute
please feel free to open issues or pull requests if some implementations are not right. Just because it works does not mean it is correct. 
