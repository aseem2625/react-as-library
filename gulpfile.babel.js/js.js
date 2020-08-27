import * as rollup from 'rollup';
import path from 'path';
import glob from 'glob';
import include from 'rollup-plugin-includepaths';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';


const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  include({
    paths: ['src/js/helpers']
  }),
  buble(),
  isProduction && uglify()
];


// Config for single .js file
const watchOptions = file => ({
  input: file,
  output: {
    format: 'iife',
    file: path.join('public','js', path.parse(file).base),
    name: 'window',
    banner: '/** @Copyright YourCompany 2019 **/',
  },
  cache: true,
  plugins
});

// Configs for all files in glob (async)
const rollupConfig = glob.sync('src/js/*.js').map(watchOptions);



/* JS: WATCH */

export function watchJS(cb) {
  rollupConfig.forEach(config =>
    rollup.watch(config).on('event', e => {
      switch (e.code) {
        case 'BUNDLE_END':
          console.log(
            `Generated ${path.parse(e.output[0]).base} in ${e.duration} ms`
          );
          break;
        case 'ERROR':
        case 'FATAL':
          console.log(e);
          break;
      }
    })
  );
}

/* JS: BUILD */

export default async function buildJS (cb) {
  let bundlesCount = 0;

  await Promise.all(rollupConfig.map(async config => {
    const bundle = await rollup.rollup(config);
    await bundle.write(config.output);

    bundlesCount++;
  }));
  console.log('Total JS bundles: ', bundlesCount);
}
