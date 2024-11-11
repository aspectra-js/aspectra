/**
 * This file must be .js
 */
import { useMDXComponents as useMDXComponentsDocs } from 'nextra-theme-docs'
import { Code, Pre } from 'nextra/components'
import { getNodeInnerText } from './src/utils/getNodeInnerText'
import { tsx } from './src/utils/tsx'

export function useMDXComponents(components) {
  return {
    ...useMDXComponentsDocs({
      pre: async props => {
        if (props['data-language'] === 'typescript') {
          const code = getNodeInnerText(props.children)
          const output = await tsx(code)
          return (
            <>
              <Pre {...props} />
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
