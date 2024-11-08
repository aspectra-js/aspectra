import type { NextPage } from 'next'

interface Props {
  Component: NextPage
  pageProps: Record<string, unknown>
}

export default function App({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}
