import { readdirSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import type { SatoriOptions } from 'satori'
import type { FontWeight } from 'satori'
import { dependencies } from '../../package.json'

export const fonts = Object.keys(dependencies)
  .filter(it => it.startsWith('@fontsource'))
  .flatMap(it =>
    readdirSync(
      join(import.meta.filename, '..', '..', '..', 'node_modules', it),
      {
        withFileTypes: true,
        recursive: true,
      },
    ).map(dirent => [basename(it), dirent] as const),
  )
  .filter(([_, it]) => it.isFile() && it.name.endsWith('.woff'))
  .map(
    ([name, dirent]) =>
      ({
        name,
        weight: Number.parseInt(
          dirent.name.split('-').at(-2) || '0',
        ) as FontWeight,
        data: readFileSync(join(dirent.parentPath, dirent.name)),
      }) satisfies SatoriOptions['fonts'][number],
  )
  .sort()
