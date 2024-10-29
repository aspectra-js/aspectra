import { type Options, defineConfig } from 'tsup'
import { compilerOptions } from './tsconfig.json'

export default defineConfig({
  entry: ['src/index.ts'],
  target: compilerOptions.target as Options['target'],
  minify: true,
  format: 'esm',
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  shims: true,
  treeshake: true,
  cjsInterop: false,
  removeNodeProtocol: false,
})
