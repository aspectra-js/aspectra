import { readdirSync } from 'node:fs'
import { cp, rm, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { build } from 'tsup'
import type { PackageJson } from 'type-fest'
import packageJson from '../../../../package.json'
import { compilerOptions } from '../../../../tsconfig.json'
import { license } from './license'
import { pick } from './pick'

const cwd = process.cwd()
const outDir = 'dist'

// find all index.ts files in the src directory
const entries = readdirSync(join(cwd, 'src'), {
  recursive: true,
  withFileTypes: true,
})
  .filter(it => it.isFile() && it.name === 'index.ts')
  .map(it => relative(cwd, join(it.parentPath, it.name)))

// build the package
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
  keepNames: true,
  cjsInterop: true,
  removeNodeProtocol: false,
  outDir,
})

// remove all .cts files (use .d.ts instead)
await Promise.all(
  readdirSync(join(cwd, outDir), {
    recursive: true,
    withFileTypes: true,
  })
    .filter(it => it.isFile() && it.name.endsWith('.cts'))
    .map(it => rm(join(it.parentPath, it.name))),
)

// read the package.json and modify it
const modified = {
  // pick only the necessary fields from the package.json
  ...pick<PackageJson>(await import(join(cwd, 'package.json')), [
    'name',
    'version',
    'type',
    'repository',
    'dependencies',
    'keywords',
  ]),
  // additional fields
  publishConfig: {
    provenance: true,
  },
  sideEffects: false,
  license: 'MIT',
  exports: {
    './package.json': './package.json',
    ...Object.fromEntries(
      entries.map(entry => {
        const path = entry.replace('src', '.')
        return [
          path.replace('/index.ts', ''),
          {
            types: path.replace('.ts', '.d.ts'),
            import: path.replace('.ts', '.js'),
            default: path.replace('.ts', '.cjs'),
          },
        ]
      }),
    ),
  },
} as PackageJson

// write the package.json, LICENSE, and README.md
await Promise.all([
  cp(join(cwd, 'README.md'), join(cwd, `${outDir}/README.md`)),
  writeFile(join(cwd, `${outDir}/LICENSE`), license(packageJson.author.name)),
  writeFile(join(cwd, `${outDir}/package.json`), JSON.stringify(modified)),
])
