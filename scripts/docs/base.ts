import { description, name } from 'package.json'
import { center, comment } from 'scripts/docs/utils'
import { paths } from 'scripts/paths'
import { type MarkdownEntryOrPrimitive, blockquote, h3 } from 'ts-markdown'

export const base: MarkdownEntryOrPrimitive[] = [
  comment(`
    DO NOT EDIT THIS FILE DIRECTLY
    run \`pnpm run build:docs\` to regenerate
  `),
  center(`<img src='${paths.banner}' alt='${paths.banner}'>`),
  center(`<h3>${name}</h3>`),
  center(description),
  h3('Installation'),
  'This library provides **stable (stage 3) decorators**. ' +
    'Set the following options in your `tsconfig.json`:',
  blockquote(['`"experimentalDecorators": false` // or remove this line']),
]
