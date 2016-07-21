var gulp = require('gulp');
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');

gulp.task('less', function() {
    gulp.src('less/app.less')
        .pipe(less())
        .pipe(prefixer('last 2 versions'))
        .pipe(gulp.dest('wwwroot/css'))
});

gulp.task('gulp-build', ['less']);

gulp.task('default', ['gulp-build'], function() {
    gulp.watch('*.less', ['less']);
})