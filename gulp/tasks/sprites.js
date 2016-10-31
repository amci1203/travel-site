var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sheet = require('gulp-svg-sprite'),
    del = require('del');
    config = {
        mode: { css: {
            sprite: 'sprite.svg',
            render: { css: {
                template: './gulp/templates/sprite.css'
            }}
        }}
    };

gulp.task('cleanSprites', function () {
    return del([
        './app/temp/sprite',
        './app/assets/images/sprites'
    ])
})
///////////////////////////////////////////////////////////////
gulp.task('createSpriteSheet', ['cleanSprites'], function () {
     return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(sheet(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
})
///////////////////////////////////////////////////////////////
gulp.task('copySpriteCSS', ['createSpriteSheet'], function () {
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_icon.css'))
        .pipe(gulp.dest('./app/assets/css/modules'));
})
gulp.task('copySpriteFile', ['createSpriteSheet'], function () {
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites'));
})
///////////////////////////////////////////////////////////////
gulp.task('endClean', ['copySpriteCSS', 'copySpriteFile'], function () {
    return del(['./app/temp/sprite']);
})
///////////////////////////////////////////////////////////////
gulp.task('icons', ['cleanSprites', 'createSpriteSheet','copySpriteCSS', 'copySpriteFile', 'endClean'])
