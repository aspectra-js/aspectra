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
  docsRepositoryBase:
    'https://github.com/shunueda/aspectra/tree/main/apps/website',
  feedback: {
    content: null,
  },
  footer: {
    content: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href='https://nextra.site' target='_blank' rel='noreferrer'>
          Shun Ueda
        </a>
        .
      </span>
    ),
  },
} satisfies DocsThemeConfig
