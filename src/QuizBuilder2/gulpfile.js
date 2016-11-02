var gulp = require('gulp');
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');

var publish_files = require('./publish_files.json');

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
    gulp.src(publish_files.file_list, {base: '.'})
        .pipe(gulp.dest('../../site'))
});