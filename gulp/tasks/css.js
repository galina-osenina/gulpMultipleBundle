const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gcmq = require('gulp-group-css-media-queries');
const size = require('gulp-size');
// const usedcss = require('usedcss');
const rename = require('gulp-rename');
const mode = require('gulp-mode')();
const merge = require('merge-stream');

const paths = require('../paths');

const CONFIGS = require('../configs/home');

const css = () => {
    let tasks = CONFIGS.map(config => {
        return gulp
            .src(config.sass.src)
            .pipe(plumber())
            .pipe(mode.development(sourcemaps.init()))
            .pipe(
                sass({
                    sourceMap: true,
                    precision: 3,
                    errLogToConsole: true,
                }).on('error', sass.logError),
            )
            .pipe(mode.production(gcmq()))
            .pipe(
                mode.production(
                    postcss([
                        // usedcss({ html: ['src/index.html'] }),
                        autoprefixer(),
                        cssnano(),
                    ]),
                ),
            )
            .pipe(mode.development(sourcemaps.write()))
            .pipe(size({ showFiles: true }))
            .pipe(rename(`${config.app.baseName}.css`))
            .pipe(gulp.dest(config.buildLocations.css));
    });
    return merge(tasks);
};

module.exports = css;
