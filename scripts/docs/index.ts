import { writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import satori from 'satori'
import { paths } from 'scripts/docs/paths'
import { Banner } from './components/banner'
import { readme } from './components/readme'
import { fonts } from './fonts'

const svg = await satori(createElement(Banner), {
  fonts,
  width: 1200,
  height: 400,
})

await Promise.all([
  writeFile(paths.banner, svg),
  writeFile(paths.readme, readme),
])
