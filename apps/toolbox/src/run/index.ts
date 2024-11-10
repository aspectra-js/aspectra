import { join } from 'node:path'

const option = process.argv.at(3)

try {
  await import(join(process.cwd(), option || ''))
} catch (e) {
  console.error(e)
  process.exit(1)
}
