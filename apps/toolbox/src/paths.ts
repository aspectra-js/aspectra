import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

export const root = join(import.meta.filename, '..', '..', '..', '..')

export const paths = {
  assets: join(root, 'packages', 'aspectra', 'assets'),
}

Object.values(paths).forEach(async path => {
  try {
    await mkdir(path)
  } catch (_) {}
})
