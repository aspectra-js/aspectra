import { readFileSync } from 'node:fs'
import { rename, writeFile } from 'node:fs/promises'
import { cp } from 'node:fs/promises'
import { join } from 'node:path'
import { webkit } from 'playwright'
import { createElement } from 'react'
import satori from 'satori'
import { paths } from '../paths'
import { Banner } from './components/banner'
import { fonts } from './fonts'

const components = [
  {
    component: Banner,
    width: 1200,
    height: 350,
  },
] as const

components.map(async ({ component, width, height }) => {
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

const codeblockUrl = `https://www.ray.so/#code=${btoa(
  readFileSync(join(import.meta.dirname, 'components', 'codeblock.ts'))
    .toString()
    .trim(),
)}&padding=16&title=aspectra&language=typescript&theme=falcon&ref=codeImage&background=true`

const browser = await webkit.launch()
const context = await browser.newContext()
const page = await context.newPage()
await page.goto(codeblockUrl)
await page.waitForTimeout(500)
await page.keyboard.down('Meta')
await page.keyboard.down('Shift')
await page.keyboard.press('S')
const [download] = await Promise.all([page.waitForEvent('download')])
const path = await download.path()
await rename(path, join(paths.assets, 'codeblock.svg'))
await browser.close()

await cp(paths.assets, paths.rootAssets, {
  recursive: true,
  force: true,
})
