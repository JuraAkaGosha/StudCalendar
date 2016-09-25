/**
 * Created by jura- on 10.06.2016.
 */
/**
 * Created by jura- on 27.05.2016.
 */
'use strict';
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify');
var bc = './bower_components/';
gulp.task('js', function() {
    gulp.src('builds/development/app/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('builds/dist/app/'))
});
gulp.task('html', function() {
    gulp.src('builds/development/**/*.html')
        .pipe(gulp.dest('builds/dist/'))
});
gulp.task('sass', function () {
    gulp.src('builds/development/sass/**/*')
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('builds/dist/css/'));
});
gulp.task('img', function() {
    gulp.src('builds/development/img/**/*')
        .pipe(gulp.dest('builds/dist/img/'));
});
gulp.task('font', function() {
    gulp.src('builds/development/fonts/**/*')
        .pipe(gulp.dest('builds/dist/fonts/'));
});
gulp.task('watch', function() {
    gulp.watch('builds/development/app/**/*.js', ['js']);
    gulp.watch('builds/development/sass/**/*.scss', ['sass']);
    gulp.watch('builds/development/**/*.html', ['html']);
    gulp.watch('builds/development/img/**/*', ['img']);
    gulp.watch('builds/development/fonts/**/*', ['font']);
});
gulp.task('libs', function() {
    gulp.src(bc + 'jquery/dist/jquery.js')
        .pipe(gulp.dest('./builds/dist/libs/jquery/'));
    gulp.src(bc+'normalize-css/normalize.css')
        .pipe(gulp.dest('./builds/dist/css/'));
    gulp.src(bc + 'bootstrap/dist/**/*.*')
        .pipe(gulp.dest('./builds/dist/libs/bootstrap/'));
    gulp.src(bc + 'bootstrap-material-design/dist/**/*.*')
        .pipe(gulp.dest('./builds/dist/libs/bootstrap-material-design/'));
    gulp.src([bc+'angular/angular.js',
        bc+'angular-animate/angular-animate.js',
        bc+'angular-cookies/angular-cookies.js',
        bc+'angular-i18n/angular-locale_ru-ru.js',
        bc+'angular-loader/angular-loader.js',
        bc+'angular-resource/angular-resource.js',
        bc+'angular-route/angular-route.js',
        bc+'angular-sanitize/angular-sanitize.js',
        bc+'angular-touch/angular-touch.js',
        bc+'firebase/firebase.js',
        bc+'angular-ui-router/release/angular-ui-router.js',
        bc+'angularfire/dist/angularfire.js',
    ])
        .pipe(concat('angular.concat.js'))
        .pipe(gulp.dest('./builds/dist/libs/angular/'));
});
gulp.task('webserver', function() {
    gulp.src('builds/dist/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});
// gulp.task('minify', function () {
//     gulp.src('builds/development/app/app.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('builds/dist/app/'));
// });
gulp.task('default', [
    'libs',
    'html',
    'img',
    'js',
    'sass',
    'font',
    'webserver',
    'watch'
]);