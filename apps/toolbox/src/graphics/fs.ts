import { writeFile } from 'node:fs/promises'
import { mkdir } from 'node:fs/promises'
import { rename } from 'node:fs/promises'
import { parse } from 'node:path'

export async function writeFileSafe(
  path: string,
  data: Parameters<typeof writeFile>[1],
) {
  const { dir } = parse(path)
  await mkdir(dir, {
    recursive: true,
  })
  await writeFile(path, data)
}

export async function renameSafe(from: string, to: string) {
  const { dir } = parse(to)
  await mkdir(dir, {
    recursive: true,
  })
  await rename(from, to)
}
