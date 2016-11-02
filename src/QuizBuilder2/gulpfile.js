var gulp = require('gulp');
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');

gulp.task('build-less', function() {
    gulp.src('less/app.less')
        .pipe(less())
        .pipe(prefixer('last 2 versions'))
        .pipe(gulp.dest('wwwroot/css'))
});

gulp.task('build-system', ['build-less']);

gulp.task('default', ['build-system'], function() {
    gulp.watch('./less/*.less', ['build-less']);
})

gulp.task('publish', ['build-system'], function() {
    
});