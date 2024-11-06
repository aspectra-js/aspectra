import { provide } from 'aspectra'
import { provider } from 'aspectra'
import type { Documentation } from './documentation'

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

    if (a.name === 'provide' && b.name === 'contextualize') {
      return -1
    }
    if (a.name === 'contextualize' && b.name === 'provide') {
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
