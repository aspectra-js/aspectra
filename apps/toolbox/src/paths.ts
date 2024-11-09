import { mkdir } from 'node:fs/promises'
import { rm } from 'node:fs/promises'
import { join } from 'node:path'

export const root = join(import.meta.filename, '..', '..', '..', '..')

export const paths = {
  root,
  assets: join(root, 'packages', 'aspectra', 'assets'),
  rootAssets: join(root, 'assets'),
  example: join(root, 'apps', 'examples'),
}

await Promise.all(
  Object.values(paths).map(async path => {
    try {
      if (path === paths.assets || path === paths.rootAssets) {
        await rm(path, {
          recursive: true,
          force: true,
        })
      }
      return await mkdir(path)
    } catch (_) {}
  }),
)
