#!/usr/bin/env tsx
const option = process.argv.at(2)

try {
  await import(`./${option}`)
} catch (e) {
  console.error(e)
  process.exit(1)
}
