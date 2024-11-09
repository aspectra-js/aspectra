import type { NextConfig } from 'next'
import nextra from 'nextra'

export default nextra({
  theme: 'nextra-theme-docs',
  themeConfig: 'theme.config.tsx',
  defaultShowCopyCode: true,
  codeHighlight: true,
})({
  transpilePackages: ['geist'],
}) satisfies NextConfig
