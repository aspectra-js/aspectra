import { readFileSync } from 'node:fs'
import { readdirSync } from 'node:fs'
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

await Promise.all(
  readdirSync(paths.example, {
    withFileTypes: true,
  })
    .filter(it => it.isDirectory() && it.name !== 'node_modules')
    .map(async folder => {
      const codeblockUrl = `https://www.ray.so/#code=${encodeURIComponent(
        btoa(
          readFileSync(join(paths.example, folder.name, 'index.ts'))
            .toString()
            .trim(),
        ),
      )}&padding=16&title=aspectra&language=typescript&theme=falcon&ref=codeImage&background=true`
      const browser = await webkit.launch()
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(codeblockUrl)
      await page.waitForTimeout(1000)
      await page.keyboard.down('Meta')
      await page.keyboard.down('Shift')
      await page.keyboard.press('S')
      const [download] = await Promise.all([page.waitForEvent('download')])
      const path = await download.path()
      await rename(path, join(paths.assets, `${folder.name}.svg`))
      await browser.close()
    }),
)

await cp(paths.assets, paths.rootAssets, {
  recursive: true,
  force: true,
})
