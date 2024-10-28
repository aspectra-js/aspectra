import { parse, sep } from 'node:path'
import type { Documentation } from 'scripts/docs/documentation'

export function getCategory(documentation: Documentation) {
  return parse(documentation.path).dir.split(sep).at(-1) || ''
}
