import { useMDXComponents as useMDXComponentsDocs } from 'nextra-theme-docs'
import { Pre } from 'nextra/components'
import { Code } from 'nextra/components'
import type { ComponentProps } from 'react'
import { getNodeInnerText } from './src/utils/getNodeInnerText'
import { tsx } from './src/utils/tsx'

export function useMDXComponents(components: typeof useMDXComponents) {
  return {
    ...useMDXComponentsDocs({
      pre: async props => {
        if (
          'data-language' in props &&
          props['data-language'] === 'typescript'
        ) {
          const output = await tsx(getNodeInnerText(props.children))
          return (
            <>
              <Pre {...(props as ComponentProps<'pre'>)} />
              {output && (
                <Pre data-filename='[auto-generated] output:' className='_px-4'>
                  <Code>{output}</Code>
                </Pre>
              )}
            </>
          )
        }
        return <Pre {...props} />
      },
    }),
    ...components,
  }
}
