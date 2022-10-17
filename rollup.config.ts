import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts';
import replace from "@rollup/plugin-replace";
import json from '@rollup/plugin-json';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload';

const { TARGET_ENV } = process.env;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      // {
      //   file: 'dist/esm/index.js',
      //   format: 'esm',
      //   sourcemap: true,
      // },
    ],
    plugins: [
      external(['react', 'react-dom']),
      json(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          TARGET_ENV === 'production' ? 'production' : 'development'
        )
      }),
      terser(),
      commonjs({
        include: [ "./src/index.ts", "node_modules/**" ],
      }),
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
     }),
      // html(),
      postcss({
        extensions: [ '.css' ],
        extract: true
      }),
      // serve({
      //   open: true,
      //   verbose: true,
      //   contentBase: ["", "web"],
      //   host: "localhost",
      //   port: '3100',
      // }),
      // livereload({ watch: ['dist', 'src'] }),
    ],
  },
  // {
  //   input: 'dist/esm/types/index.d.ts',
  //   output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  //   external: [/\.css$/],
  //   plugins: [dts()],
  // },
]
