import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { rm } from 'node:fs/promises'

export async function tsx(code: string) {
  console.log('Running tsx code...')
  const filename = `${randomUUID()}.ts`
  try {
    await writeFile(filename, code)
    const output = execSync(`pnpm tsx ${filename}`).toString()
    await rm(filename)
    return output
  } catch (err) {
    await rm(filename, {
      force: true,
    })
    throw err
  }
}
