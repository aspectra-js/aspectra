import { readFileSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import { cp } from 'node:fs/promises'
import { join } from 'node:path'
import { webkit } from 'playwright'
import { createElement } from 'react'
import satori from 'satori'
import { paths } from '../paths'
import { Banner } from './components/banner'
import { fonts } from './fonts'
import { writeFileSafe } from './fs'
import { renameSafe } from './fs'

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
  await writeFileSafe(
    join(paths.assets, `${component.name.toLowerCase()}.svg`),
    svg,
  )
})

await Promise.all(
  readdirSync(paths.example, {
    withFileTypes: true,
  })
    .filter(it => it.isDirectory() && it.name !== 'node_modules')
    .map(async folder => {
      const browser = await webkit.launch()
      const context = await browser.newContext()
      const page = await context.newPage()
      const content = readFileSync(join(paths.example, folder.name, 'index.ts'))
        .toString()
        .trim()
      await page.goto(
        `https://www.ray.so/#code=${encodeURIComponent(
          btoa(
            (content.match(/\n/g) || []).length > 20 ? `${content}\n` : content,
          ),
        )}&padding=16&title=aspectra&language=typescript&theme=falcon&ref=codeImage&background=true`,
      )
      await page.waitForTimeout(1000)
      await page.keyboard.down('Meta')
      await page.keyboard.down('Shift')
      await page.keyboard.press('S')
      const [download] = await Promise.all([page.waitForEvent('download')])
      const path = await download.path()
      await renameSafe(
        path,
        join(paths.assets, 'codeblocks', `${folder.name}.svg`),
      )
      await browser.close()
    }),
)

await cp(paths.assets, paths.localAssets, {
  recursive: true,
  force: true,
})
