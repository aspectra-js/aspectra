import { writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import satori from 'satori'
import { Banner } from 'scripts/banner/banner'
import { paths } from 'scripts/paths'
import { fonts } from './fonts'

const svg = await satori(createElement(Banner), {
  fonts,
  width: 1200,
  height: 400,
})

await writeFile(paths.banner, svg)
