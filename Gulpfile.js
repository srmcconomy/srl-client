var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', () => {
  return gulp.src('src/**/*.js?(x)')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  return gulp.watch('src/**/*.js?(x)', ['build']);
});
