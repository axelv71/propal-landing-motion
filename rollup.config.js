import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

export default {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      name: 'PropalLanding',
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true
        }),
        terser({
            compress: {
                drop_console: true,
                passes: 2,
            },
        }),
    ],
  };