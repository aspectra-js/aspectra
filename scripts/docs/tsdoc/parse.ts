import { EOL } from 'node:os'
import { Project } from 'ts-morph'
import type { Documentation } from '../documentation'
import { tsdocParser } from './parser'
import { render } from './render'
import { Tag } from './tag'

const project = new Project()

export function parse(path: string): Documentation[] {
  return (
    project
      .addSourceFileAtPath(path)
      .getFunctions()
      .map(fun => {
        const context = tsdocParser.parseString(
          `
          /**
          ${(fun.getJsDocs().at(0)?.getInnerText() || '')
            .split(EOL)
            .map(line => ` * ${line}`)
            .join(EOL)}
          **/
          `,
        )
        if (!context.docComment.modifierTagSet.hasTagName(Tag.DOCUMENTATION)) {
          return
        }
        return {
          name: fun.getName() || '',
          path,
          description: render(context.docComment.summarySection)?.trim() || '',
          remarks: render(context.docComment.remarksBlock)
            ?.replace(Tag.REMARKS, '')
            ?.trim(),
          example: render(
            context.docComment.customBlocks.find(
              it => it.blockTag.tagName === Tag.EXAMPLE,
            ),
          )
            ?.replace(Tag.EXAMPLE, '')
            ?.trim(),
        } satisfies Documentation
      })
      .filter(it => !!it) || []
  )
}
