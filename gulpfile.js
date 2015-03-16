var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    nodemon     = require('gulp-nodemon'),
    browserify  = require('gulp-browserify'),
    rename      = require('gulp-rename');


gulp.task('browserify', function() {
  gulp.src('./source/scripts/app.main.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

// -- Tasks --------------------------------------------------------------------

gulp.task('watch', function() {
  gulp.watch('./source/scripts/*.js', ['browserify'])
  return;
});

gulp.task('build', function() {
  gulp.start(['browserify']);
  return;
});

gulp.task('server', function() {
  nodemon({
    script: 'index.js',
    ext: 'js',
    ignore: '.git'
  });
});

// -- Run ----------------------------------------------------------------------

gulp.task('default', function() {
  gulp.start(['build', 'watch', 'server']);
  return;
});
