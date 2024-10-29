import { description, name } from 'package.json'
import { center } from 'scripts/docs/center'
import { paths } from 'scripts/paths'
import {
  type MarkdownEntryOrPrimitive,
  blockquote,
  type tsMarkdown,
} from 'ts-markdown'

export const base = [
  center(`<img src="${paths.banner}" alt="${paths.banner}">`),
  center(`<h3>${name}</h3>`),
  center(description),
  '<br />',
  blockquote([
    'This package provides **stage 3 (stable) decorators.**',
    '`experimentalDecorators` must be **DISABLED** in `tsconfig.json`',
  ]),
] satisfies MarkdownEntryOrPrimitive
