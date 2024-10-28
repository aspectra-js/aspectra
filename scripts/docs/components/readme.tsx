import { description, name } from 'package.json'
import { paths } from 'scripts/docs/paths'
import { tsMarkdown } from 'ts-markdown'

const entries = [] satisfies Parameters<typeof tsMarkdown>[0]

export const readme = `

<div align="center">
  <img src="${paths.banner}">
  <h3 align="center">${name}</h3>
</div>

<p align="center">
  ${description}
</p>

<hr>

> [!IMPORTANT]  
> \`experimentalDecorators\` must be **DISABLED** in \`tsconfig.json\`

${tsMarkdown(entries)}
  `.trim()
