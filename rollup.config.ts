import camelCase from 'lodash.camelcase';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

// tslint:disable-next-line:no-var-requires
const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies || {});

const libraryName = 'index';

export default {
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external,
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps()
  ],
  sourcemap: true,
  watch: {
    include: 'src/**'
  }
};
