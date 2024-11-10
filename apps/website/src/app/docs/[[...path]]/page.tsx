/* eslint-disable react-hooks/rules-of-hooks -- false positive, useMDXComponents/useTOC are not react hooks */

import { useMDXComponents } from 'nextra-theme-docs'
import { generateStaticParamsFor, importPage } from 'nextra/pages'

const key = 'path' as const

interface Props {
  params: Promise<{
    [key]: string[]
  }>
}

export const generateStaticParams = generateStaticParamsFor(key)

export async function generateMetadata(props: Props) {
  const params = await props.params
  const { metadata } = await importPage(params.path)
  return metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const { wrapper: Wrapper } = useMDXComponents()
  const {
    default: Mdx,
    useTOC,
    metadata,
    title,
  } = await importPage(params.path)
  return (
    <Wrapper toc={useTOC()} metadata={metadata} title={title}>
      <Mdx {...props} params={params} />
    </Wrapper>
  )
}
