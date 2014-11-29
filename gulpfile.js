// Include gulp
var gulp = require('gulp');

// Define node modules
var del = require('del');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

// Lint Task
gulp.task('lint', function() {
	return gulp.src('app/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('app/js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

// Concatenate $ Minify from the template file
gulp.task('deploy', function() {
	var opts = {comments:true,spare:true};
	return gulp.src('app/**/*.html')
		.pipe(usemin({
			assetDir : 'app',
			css: [minifyCss(), 'concat'],
			js: [uglify(), 'concat']
		}))
		.pipe(gulp.dest('public'));
});

gulp.task('clean:public', function (cb) {
	del([
		'public/**',
		// we don't want to clean this file though so we negate the pattern
		'!dist/mobile/deploy.json'
	], cb);
});


// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('app/js/*.js', ['lint', 'scripts']);
	gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);