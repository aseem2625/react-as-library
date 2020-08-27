/* Minify html + Put in internal CSS and Internal JS */

import pug from 'pug';
import gulp from 'gulp';
import path from 'path';
import frontMatter from 'gulp-front-matter';
import pump from 'pump';
import through from 'through2';

const workingDir = process.cwd();

export const noIndexRoutes = [];

function parseFilePath(file) {
  const p = path.parse(file.path);
  let filePath = `${p.dir}/${p.name}`;

  file.base = `${workingDir}/src/routes`;

  const relative = filePath.slice(file.base.length);

  file.path = filePath.replace(/(index)?$/, '') + '/index.html';

  return {
    filePath,
    relative
  };
}

const compileRoute = () => {
  return through.obj(function(file, enc, cb) {
    let { filePath, relative } = parseFilePath(file);

    const locals = Object.assign({
        basedir: `${workingDir}/src`,
        relative,
        filename: filePath
      },
      file.frontMatter
    );

    const pugTemplate = String(file.contents);

    // To Skip routes with noIndex in frontMatter
    if (file.frontMatter.noIndex) {
      noIndexRoutes.push(relative);
    }

    pug.render(pugTemplate, locals, (err, data) => {
      if (err) {
        return cb(err, file);
      }
      file.contents = Buffer(data);

      cb(null, file);
    });
  });
};

export function watchPug(cb) {
  return gulp.watch(['src/partials/**/*.pug', 'src/routes/**/*.pug'], { ignoreInitial: false }, buildPug);
}


export default function buildPug(cb) {
  return pump([
    gulp.src('src/routes/**/*.pug'),
    frontMatter(),
    compileRoute(),
    gulp.dest(path.join('public'))
  ], cb);
}
