import { DocExcerpt, type DocNode } from '@microsoft/tsdoc'

export function render(docNode: DocNode | undefined): string | undefined {
  if (!docNode) {
    return
  }
  return [
    docNode instanceof DocExcerpt ? docNode.content.toString() : '',
    ...docNode.getChildNodes().map(render),
  ].join('')
}

export function renderAll(docNodes: ReadonlyArray<DocNode>): string {
  return docNodes.map(render).join('')
}
