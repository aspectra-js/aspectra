import { readFileSync } from 'node:fs'

export function getPaths(filePath: string): string[] {
  const fileContent = readFileSync(filePath, 'utf-8')
  const pathRegex = /export\s+{\s*\w+\s*}\s+from\s+['"](.*)['"]/g
  const paths: string[] = []
  let match = pathRegex.exec(fileContent)
  while (match !== null) {
    paths.push(match[1])
    match = pathRegex.exec(fileContent)
  }
  return paths
}
