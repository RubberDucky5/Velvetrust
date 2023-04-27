const buildDir = "build";
// const entry = "./res/src/js/main.js";

const gulp = require('gulp');
const webserver = require('gulp-webserver');
const webpack = require('webpack-stream');

function build (callback) {
  gulp.src('res/src/js/main.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('build/'));

  callback();
}

function host (callback) {
    gulp.src(buildDir)
    .pipe(webserver({
      livereload: {enabled: true},
      directoryListing: false,
      open: true,
      port: 5517,
    }));

    // console.log("\n==========\n\nHosted at: http://localhost:5517\n\n==========\n");

    callback();
}

exports.default = gulp.series(build, host);