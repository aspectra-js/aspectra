import '../globals.css'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { NextPage } from 'next'

interface Props {
  Component: NextPage
  pageProps: Record<string, unknown>
}

export default function App({ Component, pageProps }: Props) {
  return (
    <main className={`${GeistSans.className} ${GeistMono.className}`}>
      <Component {...pageProps} />
    </main>
  )
}
