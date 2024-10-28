import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const assets = 'assets'

await mkdir(assets, {
  recursive: true,
})

export const paths = {
  banner: join(assets, 'banner.svg'),
  readme: join(assets, 'README.md'),
} as const
