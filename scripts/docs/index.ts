import { readdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { type MarkdownEntryOrPrimitive, base } from 'scripts/docs/base'
import { categorize } from 'scripts/docs/categorize'
import { parse } from 'scripts/docs/tsdoc/parse'
import { paths } from 'scripts/paths'
import { blockquote, code, h3, h4, hr, link, tsMarkdown, ul } from 'ts-markdown'

const docs = readdirSync(paths.src, {
  recursive: true,
  withFileTypes: true,
})
  .filter(it => it.isFile())
  .flatMap(it => parse(join(it.parentPath, it.name)))
  .sort()

const toc = [
  h3('Features'),
  ...Map.groupBy(docs, categorize)
    .entries()
    .flatMap(([category, docs]) => [
      h4(category),
      ...docs.map(doc =>
        ul([
          link({
            href: `#${doc.name}`,
            text: tsMarkdown([code(doc.name)]),
          }),
        ]),
      ),
    ]),
] satisfies MarkdownEntryOrPrimitive

const entries = docs.flatMap(doc => [
  h4(tsMarkdown([code(doc.name)])),
  doc.description,
  blockquote(doc.remarks),
  doc.example || '',
]) satisfies MarkdownEntryOrPrimitive

await writeFile(
  paths.readme,
  tsMarkdown(
    [base, hr(), toc, hr(), entries].flat().flatMap(it => ['', it, '']),
  ).trim(),
)
