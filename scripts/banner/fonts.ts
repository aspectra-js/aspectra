import { readFile } from 'node:fs/promises'
import { parse } from 'node:path'
import type { SatoriOptions } from 'satori'

const paths = [
  'node_modules/geist/dist/fonts/geist-sans/Geist-Black.ttf',
  'node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf',
] as const

export const fonts = await Promise.all(
  paths.map(
    async path =>
      ({
        ...parse(path),
        data: await readFile(path),
      }) satisfies SatoriOptions['fonts'][number],
  ),
)
