import { join } from 'node:path'

export const root = join(import.meta.filename, '..', '..', '..', '..')

export const paths = {
  root,
  localAssets: join(root, 'packages', 'aspectra', 'assets'),
  assets: join(root, 'assets'),
  example: join(root, 'apps', 'examples'),
}
