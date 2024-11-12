import { join } from 'node:path'
import { compileMdx } from 'nextra/compile'
import { Callout } from 'nextra/components'
import { Mermaid } from 'nextra/components'
import { MDXRemote } from 'nextra/mdx-remote'
import { Project } from 'ts-morph'

interface Props {
  name: string
  path: string
}

const project = new Project()

export async function Tsdoc({ name, path }: Props) {
  const doc = parse(join('..', '..', 'packages', name, 'src', path))
  const { result } = await compileMdx(doc)
  return (
    <MDXRemote
      compiledSource={result}
      components={{
        Callout,
        Mermaid,
      }}
    />
  )
}

export function parse(path: string) {
  return (
    project
      .addSourceFileAtPath(path)
      .getFunctions()
      .at(0)
      ?.getJsDocs()
      ?.at(0)
      ?.getInnerText() || ''
  )
}
