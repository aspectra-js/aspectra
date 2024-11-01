import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createElement } from 'react'
import satori from 'satori'
import { paths } from 'scripts/paths'
import { Banner } from 'scripts/svgs/components/banner'
import { fonts } from './fonts'

const svgs = [
  {
    component: Banner,
    width: 1200,
    height: 400,
  },
] as const

svgs.map(async ({ component, width, height }) => {
  const svg = await satori(createElement(component), {
    fonts,
    width,
    height,
  })
  await writeFile(
    join(paths.assets, `${component.name.toLowerCase()}.svg`),
    svg,
  )
})
