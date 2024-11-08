#!/usr/bin/env tsx
const option = process.argv.at(2)

switch (option) {
  case 'build':
    await import('./build')
    break
  default:
    console.error(`Unknown option: ${option}`)
    process.exit(1)
}
