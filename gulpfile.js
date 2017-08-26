/**
 * @file
 *  Gulp task definitions for the project.
 *
 */
/* eslint-env node */
'use strict';

var gulp = require('gulp');
// var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var shell = require('gulp-shell');
var phpcs = require('gulp-phpcs');
var eslint = require('gulp-eslint');
var phplint = require('gulp-phplint');
var sassLint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');

// Load in configuration.  You don't have to use this,
// but it makes it easier to update tasks in the future
// if paths aren't scattered in the gulpfile.
var config = require('./gulpconfig');

/**
 * @task sass
 * Compile files from scss
 */
gulp.task('sass', function () {
  // This needs to be changed to point to the source styles.scss file for the project theme.
  return gulp.src(config.theme_path + '/sass/styles.scss')
    // initialize sourcemaps
    .pipe(sourcemaps.init())
    // pass the file through gulp-sass
    .pipe(sass())
    // pass the file through autoprefixer
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    // add css sourcemaps
    .pipe(sourcemaps.write())
    // output .css file to css folder
    .pipe(gulp.dest(config.theme_path + '/css'));
});

/**
 * @task clearcache
 * Clear all caches
 */
gulp.task('clearcache', shell.task([
  'drush cc all'
]));

/**
 * @task watch
 * Watch scss files for changes & recompile
 * Clear cache when Drupal related files are changed
 */
gulp.task('watch', function () {
  // browserSync.init({
  //   // This needs to be replaced with your local site's proxy
  //   proxy: 'flat/gulp-and-drupal'
  // });
  gulp.watch([config.theme_path + '/sass/*.scss', config.theme_path + '/sass/**/*.scss'], ['sass', function (done) {
    // Comment out this line to prevent the whole browser from reloading
    // browserSync.reload();
  }]);
  gulp.watch('**/*.{php,inc,info}', ['clearcache', function (done) {
    // Comment out this line to prevent the whole browser from reloading
    // browserSync.reload();
  }]);
});

/**
 * Check tasks
 *
 * Add steps here to run during checking phase of the app.
 * Check steps should not require a database to function.
 */
gulp.task('check', ['check:phplint', 'check:phpcs', 'check:eslint', 'check:sasslint']);
gulp.task('check:phplint', function () {
  return gulp.src(config.phpCheck)
    .pipe(phplint('', {notify: false, skipPassedFiles: true}))
    .pipe(phplint.reporter('fail'));
});
gulp.task('check:phpcs', function () {
  return gulp.src(config.phpCheck)
    .pipe(phpcs({
      // these paths are assuming that composer files are in the backdrop root.
      bin: 'vendor/bin/phpcs',
      standard: 'vendor/drupal/coder/coder_sniffer/Drupal'
    }))
    .pipe(phpcs.reporter('log'))
    .pipe(phpcs.reporter('fail'));
});
gulp.task('check:eslint', function () {
  return gulp
    .src(config.jsCheck)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('check:sasslint', function() {
  return gulp.src([config.theme_path + '/sass/*.scss', config.theme_path + '/sass/**/*.scss'])
    .pipe(sassLint({rules: config.sass_rules}))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

/**
 * Default task, running just `gulp` will
 * compile Sass files, launch BrowserSync & watch files.
 */
gulp.task('default', ['sass', 'watch']);
