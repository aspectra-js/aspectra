import { application, contextualize, provide, provider } from 'aspectra'
import { cached } from 'aspectra/utils'

enum ContextId {
  DATABASE = 'database',
  ORDER = 'order-service',
}

@contextualize(ContextId.DATABASE)
@provider
class DatabaseProvider {
  @cached('1h') public queryAllProducts() {
    return [
      { id: 1, name: 'Laptop', price: 1000 },
      { id: 2, name: 'Smartphone', price: 500 },
    ]
  }
}

@contextualize(ContextId.DATABASE, ContextId.ORDER)
@provider
class OrderProvider {
  @provide(DatabaseProvider)
  private readonly databaseProvider!: DatabaseProvider

  public processOrder(id: number) {
    const product = this.databaseProvider
      .queryAllProducts()
      .find(it => it.id === id)
    if (product) {
      return `Order confirmed for ${product.name} at $${product.price}`
    }
    return 'Product not found'
  }
}

@contextualize(ContextId.ORDER)
@application
class CommerceApplication {
  @provide(OrderProvider)
  private readonly orderProvider!: OrderProvider

  public start() {
    console.log(this.orderProvider.processOrder(1))
    console.log(this.orderProvider.processOrder(3))
  }
}
