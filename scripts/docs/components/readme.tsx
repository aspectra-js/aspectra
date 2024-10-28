import { EOL } from 'node:os'
import { description, name } from 'package.json'
import { center } from 'scripts/docs/lib/center'
import { paths } from 'scripts/docs/paths'
import { blockquote, hr, tsMarkdown } from 'ts-markdown'

type MarkdownEntryOrPrimitive = Parameters<typeof tsMarkdown>[0]

const entries = [
  center(`<img src="${paths.banner}" alt="${paths.banner}">`),
  center(`<h3>${name}</h3>`),
  center(description),
  '',
  blockquote([
    '[!IMPORTANT]',
    '`experimentalDecorators` must be **DISABLED** in `tsconfig.json`',
  ]),
] satisfies MarkdownEntryOrPrimitive

export const readme = tsMarkdown(entries).trim()
