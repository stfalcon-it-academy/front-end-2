'use strict';

const gulp                = require('gulp');
const browserSync         = require('browser-sync').create();
const browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync);
const runSequence         = require('run-sequence');
const newer               = require('gulp-newer');
const sourcemaps          = require('gulp-sourcemaps');
const cheerio             = require('gulp-cheerio');
const order               = require('gulp-order');
const replaceString       = require('gulp-replace');
const clean               = require('gulp-clean');
const useref              = require('gulp-useref');
const gulpif              = require('gulp-if');

const concatCSS           = require('gulp-concat-css');
const autoprefixer        = require('gulp-autoprefixer');
const minifyCSS           = require('gulp-clean-css');
const sass                = require('gulp-sass');

const minifyJS            = require('gulp-uglify');
const concatJS            = require("gulp-concat");

const include             = require('gulp-html-tag-include');
const htmlhint            = require('gulp-htmlhint');

const svgSprite           = require('gulp-svg-sprite');
const svgmin              = require('gulp-svgmin');


// server
//-----------------------------------------------------------------------------------
gulp.task('server', function() {
  browserSync.init({
    server : "./dist/",
    open   : false,
    port   : 8080
  }, browserSyncReuseTab /* enabled if OS X > 10.10 */ );
});

gulp.task('server-reload', function(){
  browserSync.reload();
});


// html includes
//-----------------------------------------------------------------------------------
gulp.task('html-build', function() {
  return gulp.src('app/templates/*.html')
    .pipe(include())
    .pipe(gulp.dest('dist'));
});


// html validate
// -----------------------------------------------------------------------------------
gulp.task('html-hint', function() {
  return gulp.src('dist/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
});


// css libs
//-----------------------------------------------------------------------------------
gulp.task('css-libs', function() {
  return gulp.src('app/css/*.css')
    .pipe(concatCSS('libs.css'))
    .pipe(gulp.dest('dist/css'));
});


// sass
//-----------------------------------------------------------------------------------
gulp.task('sass', function() {
  return gulp.src('app/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});


// svg sptrite
//-----------------------------------------------------------------------------------
gulp.task('svg-sprite', function () {
	return gulp.src('app/img/svg-source/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove attr
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
				$('[xmlns]').removeAttr('xmlns');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(replaceString('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../dist/img/sprite.svg",
					render: {
						scss: {
							dest    : '../app/scss/standards/icon_default.scss',
							template: 'app/scss/standards/icon_template.scss'
						}
					}
				}
			}
		}))
		.pipe(gulp.dest(''));
});


// img copy
//-----------------------------------------------------------------------------------
gulp.task('copy-img', function() {
  return gulp.src([
    '!app/img/svg-source/*svg',
    'app/img/**/*.{png,jpg,bmp,gif,svg}'
  ])
    .pipe(newer('dist/img'))
    .pipe(gulp.dest('dist/img'));
});


// fonts copy
//-----------------------------------------------------------------------------------
gulp.task('copy-fonts', function() {
  return gulp.src('app/fonts/*.{ttf,woff,woff2,eot,svg}')
    .pipe(newer('dist/fonts/'))
    .pipe(gulp.dest('dist/fonts'));
});


// scripts
//-----------------------------------------------------------------------------------
gulp.task('js-libs', function() {
  return gulp.src('app/js/lib/*.js')
    .pipe(order([
      'moment.js'
    ]))
    .pipe(concatJS('libs.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js-modules', function() {
  return gulp.src('app/js/*.js')
    .pipe(order([
      'variables.js',
      'functions.js'
    ]))
    .pipe(concatJS('common.js'))
    .pipe(gulp.dest('dist/js'));
});


// watch
//-----------------------------------------------------------------------------------
gulp.task('watch', function() {
  gulp.watch(['app/templates/*.html', 'app/chunks/*.html'], function() { runSequence('html-build', 'server-reload', 'html-hint') });
  gulp.watch('app/css/*.css', function() { runSequence('css-libs', 'server-reload') });
  gulp.watch('app/scss/**/*.scss', function() { runSequence('sass', 'server-reload') });
  gulp.watch('app/img/**/*.{png,jpg,bmp,gif,svg}', function() { runSequence('copy-img', 'server-reload') });
  gulp.watch('app/img/svg-source/*.svg', function() { runSequence('svg-sprite', 'server-reload') });
  gulp.watch('app/fonts/*.{ttf,woff,woff2,eot,svg}', function() { runSequence('copy-fonts', 'server-reload') });
  gulp.watch('app/js/lib/*.js', function() { runSequence('js-libs', 'server-reload') });
  gulp.watch('app/js/*.js', function() { runSequence('js-modules', 'server-reload') });
});


// full optimize tasks
//-----------------------------------------------------------------------------------
gulp.task('js-css-optimize', function() {
  return gulp.src('dist/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', minifyJS()))
    .pipe(gulpif('*.css', minifyCSS()))
    .pipe(gulpif('*.css', autoprefixer('last 15 versions')))
    .pipe(gulp.dest('dist'));
});

gulp.task('css-dist-clean', function() {
  return gulp.src([
    '!dist/css/style.min.css',
    'dist/css/*.css',
    'dist/css/*.map'
  ])
    .pipe(clean());
});

gulp.task('js-dist-clean', function() {
  return gulp.src('dist/js/libs.js')
    .pipe(clean());
});

gulp.task('dist-clean', function() {
  return gulp.src('dist/*')
    .pipe(clean());
});


// general tasks
//-----------------------------------------------------------------------------------
gulp.task('build', function(){
  runSequence('dist-clean', ['html-build', 'sass', 'css-libs', 'svg-sprite', 'copy-img', 'copy-fonts', 'js-libs', 'js-modules'], 'html-hint');
});

gulp.task('optimize', function() {
  runSequence('dist-clean', ['html-build', 'sass', 'css-libs', 'svg-sprite', 'copy-img', 'copy-fonts', 'js-libs', 'js-modules'], 'js-css-optimize', ['css-dist-clean', 'js-dist-clean']);
});

gulp.task('dev', function(){
  runSequence('build', 'server', 'watch');
});
