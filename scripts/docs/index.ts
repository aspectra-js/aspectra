import { readdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { base } from 'scripts/docs/base'
import { sorter } from 'scripts/docs/sorter'
import { parseDoc } from 'scripts/docs/tsdoc/parse-doc'
import { paths } from 'scripts/paths'
import {
  type MarkdownEntryOrPrimitive,
  blockquote,
  code,
  h3,
  h4,
  hr,
  link,
  tsMarkdown,
  ul,
} from 'ts-markdown'

const docs = readdirSync(paths.src, {
  recursive: true,
  withFileTypes: true,
})
  .filter(it => it.isFile())
  .flatMap(it => parseDoc(join(it.parentPath, it.name)))
  .sort(sorter)

const toc: MarkdownEntryOrPrimitive = [
  h3('Features'),
  ...Map.groupBy(docs, doc => doc.category)
    .entries()
    .flatMap(([category, categoryDocs]) => [
      h4(category),
      categoryDocs.sort(sorter).map(doc =>
        ul([
          link({
            href: `#${doc.name}`,
            text: tsMarkdown([code(doc.name)]),
          }),
        ]),
      ),
    ]),
].flat()

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
