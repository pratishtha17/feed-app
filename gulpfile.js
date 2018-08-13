var gulp = require("gulp");

var htmlMin = require("gulp-htmlmin");

gulp.task('default', ['watch'], function() {
    gulpUtil.log("Gulp Configured");
});

gulp.task('watch', function() {
    gulp.watch(['src/*.html'], ['html-minify']);
});

gulp.task('html-minify', function() {
    return gulp.src('app/*.html').pipe(htmlMin({ collapseWhitespace: true })).pipe(gulp.dest('app/build/'));
});