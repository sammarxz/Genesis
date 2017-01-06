'use strict';

const gulp        = require('gulp'),
      sass        = require('gulp-sass'),
      nunjucks    = require('gulp-nunjucks'),
      maps        = require('gulp-sourcemaps'),
      concat      = require('gulp-concat'),
      uglify      = require('gulp-uglify'),
      rename      = require('gulp-rename');

gulp.task('concatScripts', () =>
    gulp.src('src/js/*.js')
        .pipe(maps.init())
        .pipe(concat('app.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('src/static/js/'))
);

gulp.task('minifyScripts', () =>
    gulp.src('src/static/js/app.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist/static/js/'))
);

gulp.task('compileSass', () =>
    gulp.src('src/scss/application.scss')
        .pipe(maps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('src/static/css'))
);

gulp.task('compileNunjucks', () =>
    gulp.src('src/templates/index.html')
        .pipe(nunjucks.compile())
        .pipe(gulp.dest('src/'))
);