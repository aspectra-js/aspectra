import type { DocsThemeConfig } from 'nextra-theme-docs'
import pkg from './package.json'

export default {
  logo: (
    <span
      style={{
        letterSpacing: '-0.05em',
        fontWeight: 600,
      }}
    >
      @spectra
    </span>
  ),
  project: {
    link: pkg.repository.url,
  },
} satisfies DocsThemeConfig
