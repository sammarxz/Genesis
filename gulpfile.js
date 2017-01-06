'use strict';

const gulp        = require('gulp'),
      sass        = require('gulp-sass'),
      nunjucks    = require('gulp-nunjucks');

gulp.task('compileSass', () =>
    gulp.src('src/scss/application.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/static/css'))
);

gulp.task('compileNunjucks', () =>
    gulp.src('src/templates/index.html')
        .pipe(nunjucks.compile())
        .pipe(gulp.dest('src/'))
);