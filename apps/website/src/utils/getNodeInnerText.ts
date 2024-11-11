import { isValidElement } from 'react'
import type { ReactNode } from 'react'

export function getNodeInnerText(node: ReactNode): string {
  if (!node) {
    return ''
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }
  if (isValidElement(node) && node.props.children) {
    return getNodeInnerText(node.props.children)
  }
  if (Array.isArray(node)) {
    return node.flatMap(child => getNodeInnerText(child)).join('')
  }
  return ''
}
