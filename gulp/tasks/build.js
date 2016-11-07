var gulp = require('gulp'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssNano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    minimizeIMG = require('gulp-imagemin');

gulp.task('build', [
    'cleanDist',
    'optimizeIMGs',
    'optimizeStaticFiles',
    'copyGeneralFiles'
]);

gulp.task('cleanDist', function () {
    return del(['./dist']);
})

gulp.task('copyGeneralFiles', ['cleanDist'], function () {
    return gulp.src([
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/{js,css,images}/**',
        '!./app/temp',
        '!./app/temp/**',
        ])
        .pipe(gulp.dest('./dist'))
})

gulp.task('optimizeIMGs', ['cleanDist', 'icons'], function () {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/**/*-i.*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(minimizeIMG({
        pregressive: true,
        interlaced: true,
        multipass: true,
    }))
    .pipe(gulp.dest('./dist/assets/images'))
})

gulp.task('optimizeStaticFiles', ['cleanDist', 'css', 'scripts'], function () {
    return gulp.src(['./app/index.html'])
        .pipe(usemin({
            css: [
                function () {
                    return rev();
                },
                 function () {
                    return cssNano();
                }
             ],
            js: [
                function () {
                    return rev()
                },
                function () {
                    return uglify();
                }
            ]
        }))
        .pipe(gulp.dest('./dist'))
})
