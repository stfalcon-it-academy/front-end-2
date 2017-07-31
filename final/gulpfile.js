const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync =require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

gulp.task('sass', function() {
	return gulp.src('work/**/*.scss')
						.pipe(sass().on('error', sass.logError))
						.pipe(gulp.dest('css'))
						.pipe(browserSync.reload({stream:true}))
});
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir:'./'
		},
		notify:false
	})
});
gulp.task('script', function(){
	return gulp.src{[
		'./js/*.js'
		]}
			.pipe(uglify())
			.pipe(gulp.dest('./'));
		});
gulp.task

gulp.task('watch', ['browser-sync', 'sass', 'script'],function () {
	gulp.watch('work/**/*.scss', ['sass']);
	gulp.watch('work/**/*.scss', ['script']);
});

gulp.task('default', ['watch']);
