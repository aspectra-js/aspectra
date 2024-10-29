<div align="center"><img src="assets/banner.svg" alt="assets/banner.svg"></div>


<div align="center"><h3>aspectra</h3></div>


<div align="center">The decorator library.</div>


<br />


<div align="center"><code>$ npm install aspectra</code></div>


<br />


> [!IMPORTANT]
> This package uses Stage 3 (stable) decorators.
> `experimentalDecorators` must be **DISABLED** in `tsconfig.json`



---



### Features



#### decorators



- [`autobind`](#autobind)



- [`bound`](#bound)



- [`entry`](#entry)



- [`main`](#main)



- [`sealed`](#sealed)



#### injection



- [`provide`](#provide)



- [`provider`](#provider)



---



#### `autobind`



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


#### `bound`



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


#### `entry`



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


#### `main`



Automatically invokes a decorated method.


> 



```typescript
import { main } from 'aspectra'

class Main {
  @main public static start() {
    console.log('Hello, World!')
  }
}
```


#### `sealed`



Seals a class, preventing it from being extended.


> Error is throw when attempting to instantiate a derived class.



```typescript
@sealed
class Base {}

class Derived extends Base {}

const instance = new Derived() // throws
```


#### `provide`



Inject a [`@provider`](#provider) into a class field.


> If an `identifier` is provided (`string` or `symbol`), the key will be used to
> resolve the dependency from the container. Otherwise, name of the class will
> be used as an identifier.



```typescript
class Providers {
  @provide(SampleProvider)
  // notice the `!` for definite assignment
  private readonly provider!: SampleProvider;

  // with a custom name
  @provide('custom_name')
  private readonly namedProvider!: NamedProvider;

  // this will be a same instance as the `provider` above
  @provide(SampleProvider)
  private readonly second_provider!: SampleProvider;
}
```


#### `provider`



Registers a class as a provider, allowing it to be injected via
[`@provide`](#provide).


> You can set a custom `identifier` (`string` or `symbol`). Otherwise,
> name of the class will be used as an identifier.



```typescript
@provider
class SampleProvider {
  // ...
}

@provider('custom_name')
class NamedSampleProvider {
  // ...
}
```