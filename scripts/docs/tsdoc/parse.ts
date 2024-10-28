import { EOL } from 'node:os'
import { TSDocParser } from '@microsoft/tsdoc'
import { Project } from 'ts-morph'
import type { Documentation } from '../documentation'
import { render } from './render'
import { Tag } from './tag'

const project = new Project()
const tsdocParser = new TSDocParser()

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
      }) || []
  )
}
