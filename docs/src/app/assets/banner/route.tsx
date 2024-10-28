import { readFile } from 'node:fs/promises'
import { parse } from 'node:path'
import { ImageResponse } from 'next/og'
import { Banner } from '#components/banner'

const paths = [
  'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf',
  'node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf',
]

export async function GET() {
  return new ImageResponse(<Banner />, {
    fonts: await Promise.all(
      paths.map(async path => ({
        ...parse(path),
        data: await readFile(path),
      })),
    ),
    width: 1200,
    height: 400,
  })
}
