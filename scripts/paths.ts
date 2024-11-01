import { join } from 'node:path'

const assets = 'assets'

export const paths = {
  assets,
  src: 'src',
  readme: 'README.md',
  banner: join(assets, 'banner.svg'),
} as const
