var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var jest = require('gulp-jest').default;
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
 
gulp.task('jest', function () {
  process.env.NODE_ENV = 'test';

  return gulp.src('**/__tests__').pipe(jest({
    "preprocessorIgnorePatterns": [
      "<rootDir>/build/", "<rootDir>/node_modules/"
    ],
    "automock": false
  }));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      directoryListing: false,
      path: '/',
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('js', function () {
  return browserify('./src/js/index.js')
  .transform(babelify, {
    presets: ['es2015', 'stage-0']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build/'))
});

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
})

gulp.task('default', ['sass', 'js']);

gulp.task('server', ['default', 'watch', 'webserver']);

gulp.task('watch', function () {
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./serviceWorker.js', ['js']);
  gulp.watch('./src/scss/**/*.scss', ['sass']); 
});