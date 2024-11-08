import type { NextConfig } from 'next'
import nextra from 'nextra'

export default nextra({
  theme: 'nextra-theme-docs',
  themeConfig: 'theme.config.tsx',
}) satisfies NextConfig
