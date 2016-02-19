var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

gulp.task('babel', () => {
  return gulp.src('src/**/*.js?(x)')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', () => {
  return gulp.src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('css'));
})

gulp.task('build', ['babel', 'sass']);

gulp.task('watch', () => {
  gulp.watch('src/**/*.js?(x)', ['babel']);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['build', 'watch']);
