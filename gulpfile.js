'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    maps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    del = require('del'),
    uglify = require('gulp-uglify');

gulp.task('browserSync', function() {
    browserSync.init({
        logSnippet: false,
        proxy: 'https://gailwilley.vm/',
        host: 'localhost',
        open: 'external',
        notify:    false,
        ghost:     false
    })
  })

gulp.task("clean", () => del(['dist', 'style.min.css*']));

gulp.task('uglify', function(){
    return gulp.src("js/**/*.js")
    .pipe(maps.init())
    .pipe(uglify())
    .pipe(maps.write("./"))
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', function(){
    return gulp.src('scss/**/*.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});



gulp.task('watch', function(){
    gulp.watch('scss/**/*.scss')
    .on('change', function(path, stats) {
        return gulp.src('scss/**/*.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))    });
}, 'browserSync');

gulp.task('production', function(){
    return gulp.src('style.css')
    .pipe(postcss([autoprefixer]))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''));
});