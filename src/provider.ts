import type { Class } from '#types'

export enum ProviderScope {
  SINGLETON = 'singleton',
  TRANSIENT = 'transient',
  LAZY = 'lazy',
}

export abstract class Provider {
  protected constructor(public readonly scope: ProviderScope) {}
}

export class SingletonProvider<T extends Class<unknown>> extends Provider {
  public constructor(public readonly instance: InstanceType<T>) {
    super(ProviderScope.SINGLETON)
  }
}

export class TransientProvider extends Provider {
  public constructor(public readonly classType: Class<unknown>) {
    super(ProviderScope.TRANSIENT)
  }
}

export class LazyProvider<T extends Class<unknown>> extends Provider {
  public initialized = false
  public instance?: InstanceType<T>

  public constructor(public readonly classType: Class<unknown>) {
    super(ProviderScope.LAZY)
  }
}
