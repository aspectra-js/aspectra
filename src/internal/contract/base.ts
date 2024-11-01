import type { UnknownArgs } from '#types'

interface Detail<A extends UnknownArgs> {
  readonly error: string
  readonly assertion: (...args: A) => {
    success: boolean
    message?: string
  }
}

export class Base<A extends UnknownArgs> implements Detail<A> {
  public readonly error: string
  public readonly assertion: (...args: A) => {
    success: boolean
    message?: string
  }

  public constructor({ error, assertion }: Detail<A>) {
    this.error = error
    this.assertion = assertion
  }

  public check(...args: A) {
    const { success, message } = this.assertion(...args)
    if (!success) {
      const error = new Error(message)
      error.name = this.error
      throw error
    }
  }
}
