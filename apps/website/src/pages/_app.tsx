import '../globals.css'
import { GeistSans } from 'geist/font/sans'
import type { NextPage } from 'next'

interface Props {
  Component: NextPage
  pageProps: Record<string, unknown>
}

export default function App({ Component, pageProps }: Props) {
  return (
    <main className={`${GeistSans.className}`}>
      <Component {...pageProps} />
    </main>
  )
}
