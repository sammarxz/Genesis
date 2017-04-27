"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    nunjucks = require("gulp-nunjucks"),
    htmlmin = require("gulp-htmlmin"),
    maps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    cssmin = require("gulp-cssmin"),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync").create();

gulp.task("concatScripts", function() {
    return gulp.src("src/js/*.js")
        .pipe(maps.init())
        .pipe(concat("app.js"))
        .pipe(maps.write("./"))
        .pipe(gulp.dest("static/js/"))
        .pipe(browserSync.stream());
});

gulp.task("minifyScripts", function() {
    return gulp.src("src/static/js/app.js")
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("static/js/"));
});

gulp.task("compileSass", function() {
    return gulp.src("src/scss/application.scss")
        .pipe(maps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(maps.write("./"))
        .pipe(gulp.dest("static/css"))
        .pipe(browserSync.stream());
});

gulp.task("minifyStylesheet", function() {
    return gulp.src("src/static/css/application.css")
        .pipe(cssmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("static/css/"));
});

gulp.task("compileNunjucks", function() {
    return gulp.src("src/templates/index.html")
        .pipe(nunjucks.compile())
        .pipe(gulp.dest(""));
});

gulp.task("minifyHtml", function() {
    return gulp.src("*.html")
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("server", ["compileSass", "concatScripts", "compileNunjucks"], function() {
    browserSync.init({
        server: {
            baseDir: ""
        }
    });

    gulp.watch("src/scss/**/*.scss", ["compileSass"]);
    gulp.watch("src/js/*.js", ["concatScripts"]);
    gulp.watch("src/templates/**/*.html", ["compileNunjucks"]);
    gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task("build", ["minifyScripts", "minifyStylesheet", "minifyHtml"], function() {
    return gulp.src(["static/css/application.min.css", "static/js/app.min.js",
            "static/img/**"
        ], {
            base: "src"
        })
        .pipe(gulp.dest(""));
});
