'use strict';

const gulp          = require('gulp'),
      sass          = require('gulp-sass'),
      nunjucks      = require('gulp-nunjucks'),
      htmlmin       = require('gulp-htmlmin'),
      maps          = require('gulp-sourcemaps'),
      autoprefixer  = require("gulp-autoprefixer"),
      concat        = require('gulp-concat'),
      uglify        = require('gulp-uglify'),
      cssmin        = require('gulp-cssmin'),
      rename        = require('gulp-rename'),
      browserSync   = require('browser-sync').create();

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
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/static/js/'))
);

gulp.task('compileSass', () =>
    gulp.src('src/scss/application.scss')
        .pipe(maps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('src/static/css'))
);

gulp.task('minifyStylesheet', () =>
    gulp.src('src/static/css/application.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/static/css/'))
);

gulp.task('compileNunjucks', () =>
    gulp.src('src/templates/index.html')
        .pipe(nunjucks.compile())
        .pipe(gulp.dest('src/'))
);

gulp.task('minifyHtml', () =>
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
);

gulp.task('watch', function() {
    gulp.watch("src/scss/**/*.scss", ['compileSass']);
    gulp.watch("src/templates/**/*.html", ['compileNunjucks'])
});

gulp.task('build', ['minifyScripts', 'minifyStylesheet', 'minifyHtml'], function() {
    return gulp.src(["src/static/css/application.min.css", "src/static/js/app.min.js",
              "src/static/img/**"], { base: 'src'})
          .pipe(gulp.dest('dist'))
});