import type { Documentation } from 'scripts/docs/documentation'
import { provide } from '#decorators/injection/provide'
import { provider } from '#decorators/injection/provider'

export function sorter(a: Documentation, b: Documentation) {
  if (a.category !== b.category) return a.category.localeCompare(b.category)

  if (a.category === 'injection') {
    if (a.name === 'provider' && b.name === 'provide') {
      return -1
    }
    if (a.name === 'provide' && b.name === 'provider') {
      return 1
    }
    if (
      (a.name === provide.name || a.name === provider.name) &&
      !(b.name === provide.name || b.name === provider.name)
    ) {
      return -1
    }
    if (
      !(a.name === provide.name || a.name === provider.name) &&
      (b.name === provide.name || b.name === provider.name)
    ) {
      return 1
    }
  }

  return a.name.localeCompare(b.name)
}
