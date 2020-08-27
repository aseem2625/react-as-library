/* Generate sitemap for website routes */

import { writeFileSync } from 'fs';
import path from 'path';
import glob from 'glob';
import { noIndexRoutes } from './html';

const publicDir = path.join('public');
const DOMAIN = 'https://xyz.com';
const SITEMAP_file = 'sitemap.txt';

function _getDeepestFolderPath(input) {
  return input.slice(0, -10);
}

function _addDomainName(path) {
  return path.replace(/^public/, DOMAIN);
}

export default function (cb) {
  const inputs = glob.sync(`${publicDir}/**/index.html`);
  console.log('....', noIndexRoutes);
  const exclusions = noIndexRoutes.map(r => publicDir + r + '/');

  const sitemap = inputs
    .map(_getDeepestFolderPath)
    .filter(path => !~exclusions.indexOf(path))
    .map(_addDomainName)
    .map(encodeURI)
    .join('\r\n');

  writeFileSync(`${publicDir}/${SITEMAP_file}`, sitemap);

  cb();
}
