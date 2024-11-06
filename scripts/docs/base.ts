import { type MarkdownEntryOrPrimitive, h3 } from 'ts-markdown'
import { codeblock } from 'ts-markdown'
import { description, name } from '../../package.json'
import { paths } from '../paths'
import { center, comment } from './utils'

export const base: MarkdownEntryOrPrimitive[] = [
  comment(`
    DO NOT EDIT THIS FILE DIRECTLY
    run \`pnpm run build:docs\` to regenerate
  `),
  center(`<img src='${paths.banner}' alt='${paths.banner}'>`),
  center(`<h3>${name}</h3>`),
  center(description),
  h3('Introduction'),
  'This library provides **stable (stage 3) decorators**. ' +
    'Set the following options in your `tsconfig.json`:',
  codeblock(
    [
      '{',
      '  "experimentalDecorators": false, // or remove this line',
      '  "target": "es2022" // or above',
      '}',
    ],
    {
      language: 'json',
    },
  ),
]
