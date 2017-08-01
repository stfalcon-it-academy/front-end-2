'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const html = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const js = require('gulp-js-import');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');

gulp.task('default', ['server', 'watch']);

browserSync.watch('./build/**/*.*').on('change', browserSync.reload);

gulp.task('watch', function() {
	gulp.watch('./project/sass/**/*.scss', ['sass']);
	gulp.watch('./project/html/**/**/*.html', ['html']);
	gulp.watch('./project/js/**/*.js', ['js']);
});

gulp.task('sass', function() {
	return gulp.src('./project/sass/*.scss')
    .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build/css'))
});

gulp.task('html', function() {
  gulp.src(['./project/html/*.html'])
    .pipe(html({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('js', function() {
  return gulp.src('./project/js/*.js')
  .pipe(js())
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'))
});

gulp.task('server', function() {
  browserSync.init({
    open: false,
    server: {
      baseDir: 'build'
    }
  });
});