const gulp = require('gulp');
const injectLib = require('gulp-inject');
const paths = require('../paths');
const merge = require('merge-stream');

const injectLinks = () => {
  const sources = gulp.src([paths.inject.css, paths.inject.js], {
    read: false,
  });

  const CONFIGS = require('../configs/home');

  let tasks = CONFIGS.map(config => {
    return gulp
      .src(`build/${config.page}.html`)
      .pipe(injectLib(gulp.src([`${config.buildLocations.css}${config.page}.css`, paths.inject.js], {
        read: false,
      }), { relative: true }))
      .pipe(gulp.dest(paths.build.html));
  });
  return merge(tasks);

};

module.exports = injectLinks;
