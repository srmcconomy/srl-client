var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');

gulp.task('build', () => {
  return gulp.src('src/**/*.js?(x)')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  return gulp.watch('src/**/*.js?(x)', ['build']);
});
