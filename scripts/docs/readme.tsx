import { description, license, name, version } from 'package.json'
import { center } from 'scripts/docs/center'
import { paths } from 'scripts/paths'
import { blockquote, code, h3, hr, type tsMarkdown } from 'ts-markdown'

export type MarkdownEntryOrPrimitive = Parameters<typeof tsMarkdown>[0]

export const readme = [
  center(`<img src="${paths.banner}" alt="${paths.banner}">`),
  center(`<h3>${name}</h3>`),
  center(description),
  h3('Installation'),
  code(`$ npm install ${name}`),
  blockquote([
    '[!IMPORTANT]',
    'This package uses Stage 3 (stable) decorators.',
    '`experimentalDecorators` must be **DISABLED** in `tsconfig.json`',
  ]),
] satisfies MarkdownEntryOrPrimitive
