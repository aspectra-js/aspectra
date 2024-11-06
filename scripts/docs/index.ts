import { writeFile } from 'node:fs/promises'
import {
  type MarkdownEntryOrPrimitive,
  blockquote,
  code,
  h3,
  h4,
  hr,
  tsMarkdown,
} from 'ts-markdown'
import { paths } from '../paths'
import { base } from './base'
import { parseDoc } from './tsdoc/parse-doc'

const docs = [
  [
    'src/decorators/provider.ts',
    'src/decorators/provide.ts',
    'src/decorators/contextualize.ts',
    'src/context.ts',
    'src/decorators/isolated.ts',
    'src/decorators/transient.ts',
    'src/decorators/origin.ts',
    'src/decorators/contexts.ts',
  ],
  [
    'src/utils/decorators/application.ts',
    'src/utils/decorators/autobind.ts',
    'src/utils/decorators/bound.ts',
    'src/utils/decorators/main.ts',
    'src/utils/decorators/memoized.ts',
    'src/utils/decorators/postconstruct.ts',
    'src/utils/decorators/sealed.ts',
    'src/utils/decorators/singleton.ts',
  ],
]
  .flat()
  .flatMap(parseDoc)

const grouped = Map.groupBy(docs, doc => doc.category)
  .entries()
  .toArray()

const toc: MarkdownEntryOrPrimitive = [
  h3('Features'),
  `
  | ${grouped.map(([category]) => category).join(' | ')} |
  | - | - |
  | ${grouped
    .map(([_, docs]) =>
      docs.map(doc => `[\`${doc.name}\`](#${doc.name})`).join('<br>'),
    )
    .join(' | ')} |
  `,
]

const entries: MarkdownEntryOrPrimitive = docs.flatMap((doc, i) => {
  return [
    i === 0 || doc.category !== docs[i - 1].category
      ? h3(docs[i].category)
      : '',
    h4(code(doc.name)),
    doc.description,
    doc.remarks ? blockquote(doc.remarks) : '',
    doc.example || '',
  ]
})

await writeFile(
  paths.readme,
  tsMarkdown(
    [base, toc, hr(), entries].flat().flatMap(it => ['', it, '']),
  ).trim(),
)
