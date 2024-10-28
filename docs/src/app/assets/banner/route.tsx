import { readFile } from 'node:fs/promises'
import { join, parse } from 'node:path'
import { ImageResponse } from 'next/og'
import { Banner } from '#components/banner'

const fonts = await Promise.all(
  ['Geist-Bold.ttf', 'GeistMono-Bold.ttf'].map(async name => {
    return [name, await readFile(join(process.cwd(), 'fonts', name))] as const
  }),
)

const imageResponse = new ImageResponse(<Banner />, {
  fonts: await Promise.all(
    fonts.map(async font => ({
      ...parse(font[0]),
      data: font[1],
    })),
  ),
  width: 1200,
  height: 400,
})

export async function GET() {
  return imageResponse
}
