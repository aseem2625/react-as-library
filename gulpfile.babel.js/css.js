import gulp from 'gulp';
import path from 'path';
import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import pump from 'pump';

const isProduction = process.env.NODE_ENV === 'production';

const autoprefixerOptions = {
  browsers: ['last 2 versions'],
  cascade: true
};
const stylusOptions = {
  paths: ['src/css/imports'],
  'include css': true,
};

export function watchCSS(cb) {
  function compileCSS(cb) {
    return pump([
      gulp.src(path.join('src/css/*.+(styl|css)')),
      stylus(stylusOptions),
      gulp.dest(path.join('public','css'))
    ], cb);
  }

  return gulp.watch('src/css/**/**.+(styl|css)', { ignoreInitial: false }, compileCSS);
}

// TODO: Refactor the common part. Making common array is not working, so to find different elegant alternate.
export default function buildCSS(cb) {
  return pump([
    gulp.src(path.join('src/css/*.+(styl|css)')),
    stylus(stylusOptions),
    cleanCSS(),
    autoprefixer(autoprefixerOptions),
    gulp.dest(path.join('public','css'))
  ], cb);
}
