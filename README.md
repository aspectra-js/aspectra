<div align="center"><img src="assets/banner.svg" alt="assets/banner.svg"></div>


<div align="center"><h3>aspectra</h3></div>


<div align="center">The decorator library.</div>


### Installation



`$ npm install aspectra`


> [!IMPORTANT]
> This package uses Stage 3 (stable) decorators.
> `experimentalDecorators` must be **DISABLED** in `tsconfig.json`



---



### Features



#### decorators



- [autobind](#autobind)



- [bound](#bound)



- [entry](#entry)



---



#### autobind



Automatically binds all class methods to the instance.


> 



```typescript
@autobind
class Example {
  private readonly name = 'John'

  public greet() {
    console.log(`Hello from ${this.name}`)
  }

  public farewell() {
    console.log(`Goodbye from ${this.name}`)
  }
}

const { greet, farewell } = new Example()
greet() // "Hello from John"
farewell() // "Goodbye from John"
```


#### bound



Binds a class method to its instance.


> 



```typescript
class Example {
  private readonly name = 'John'

  @bound public greet() {
    console.log(`Hello from ${this.name}`)
  }
}

const { greet } = new Example()
greet() // "Hello from John"
```


#### entry



Automatically invokes a class's static `main` method.


> The target class must include a static `main` method.



```typescript
import { entry } from 'aspectra'

@entry
class Main {
  public static main() {
    console.log('Hello, World!')
  }
}
```