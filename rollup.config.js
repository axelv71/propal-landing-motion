import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      name: 'PropalLandingMotion',
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true
        }),
        nodeResolve({
            browser: true,
            preferBuiltins: false
        }),
        commonjs(),
        terser(),
    ],
  };