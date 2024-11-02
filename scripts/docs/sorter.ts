import type { Documentation } from 'scripts/docs/documentation'
import { provide } from '../../src'
import { provider } from '../../src'

const empty = ''

export function sorter(a: Documentation, b: Documentation) {
  if (a.category === empty && b.category !== empty) {
    return -1
  }
  if (a.category !== empty && b.category === empty) {
    return 1
  }

  if (a.category !== b.category) {
    return a.category.localeCompare(b.category)
  }

  if (a.category === empty) {
    if (a.name === provider.name && b.name === provide.name) {
      return -1
    }
    if (a.name === provide.name && b.name === provider.name) {
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
