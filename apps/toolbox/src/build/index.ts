import { readFileSync, readdirSync } from 'node:fs'
import { cp, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { build } from 'tsup'
import type { PackageJson } from 'type-fest'
import packageJson from '../../../../package.json'
import { compilerOptions } from '../../../../tsconfig.json'
import { license } from './license'
import { pick } from './pick'

const cwd = process.cwd()
const outDir = 'dist'

const entries = readdirSync(join(cwd, 'src'), {
  recursive: true,
  withFileTypes: true,
})
  .filter(it => it.isFile() && it.name === 'index.ts')
  .map(it => relative(cwd, join(it.parentPath, it.name)))

await build({
  entry: entries,
  target: compilerOptions.target || '',
  minify: true,
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  shims: true,
  treeshake: true,
  cjsInterop: true,
  removeNodeProtocol: false,
  outDir,
})

await Promise.all([
  writeFile(join(cwd, `${outDir}/LICENSE`), license(packageJson.author.name)),
  cp(join(cwd, 'README.md'), join(cwd, `${outDir}/README.md`)),
  writeFile(
    join(cwd, `${outDir}/package.json`),
    JSON.stringify({
      ...pick(
        JSON.parse(
          readFileSync(join(cwd, 'package.json'), 'utf-8'),
        ) as PackageJson,
        ['name', 'version', 'type', 'repository', 'dependencies', 'keywords'],
      ),
      publishConfig: {
        provenance: true,
      },
      sideEffects: false,
      license: 'MIT',
      exports: {
        './package.json': './package.json',
        ...Object.fromEntries(
          entries.map(entry => {
            const relative = entry.replace('src', '.')
            return [
              relative.replace('/index.ts', ''),
              {
                types: relative.replace('.ts', '.d.ts'),
                import: relative.replace('.ts', '.js'),
                default: relative.replace('.ts', '.cjs'),
              },
            ]
          }),
        ),
      },
    } as PackageJson),
  ),
])
