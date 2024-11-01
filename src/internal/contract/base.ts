import type { UnknownArgs } from '#types'

interface Detail<A extends UnknownArgs> {
  readonly title: string
  readonly assertion: (...args: A) => {
    success: boolean
    message?: string
  }
}

export class Base<A extends UnknownArgs> implements Detail<A> {
  public readonly title: string
  public readonly assertion: (...args: A) => {
    success: boolean
    message?: string
  }

  public constructor({ title, assertion }: Detail<A>) {
    this.title = title
    this.assertion = assertion
  }

  public check(...args: A) {
    const { success, message } = this.assertion(...args)
    if (!success) {
      const error = new Error(message)
      error.name = this.title
      throw error
    }
  }
}
