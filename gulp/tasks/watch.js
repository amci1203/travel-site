var browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('cssInject', ['css'], function () {
    return gulp.src('./app/styles.css')
    .pipe(browserSync.stream());
});
gulp.task('default', function () {
    gulp.start('watch');
})

gulp.task('watch', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'app'
        }
    });
    watch('./app/assets/css/**/**.css', function () {
        gulp.start('cssInject');
    });
    watch('./app/index.html', function () {
        browserSync.reload();
    });
});

