import { join } from 'node:path'

export const root = join(import.meta.filename, '..', '..', '..', '..')

export const paths = {
  assets: join(root, 'assets'),
}
