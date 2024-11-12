import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { description, name } from '~/packages/aspectra/package.json'

export const { viewport } = Head

export const metadata: Metadata = {
  metadataBase: new URL('https://nextra.site'),
  title: {
    absolute: name,
    template: `%s - ${name}`,
  },
  description,
}

interface LayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en' dir='ltr' suppressHydrationWarning>
      <Head faviconGlyph='@' />
      <body>
        <Layout
          navbar={<Navbar logo={<b>@spectra</b>} />}
          footer={
            <Footer>{`MIT ${new Date().getUTCFullYear()} © ${name}.`}</Footer>
          }
          docsRepositoryBase='https://github.com/shunueda/aspectra/apps/website'
          pageMap={await getPageMap()}
          feedback={{
            content: null,
          }}
          sidebar={{
            defaultMenuCollapseLevel: 4,
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
