"use strict";

var browserify = require('browserify'),
    gulp = require('gulp'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    source = require('vinyl-source-stream');

var dist_dir = './dist/',
    src_dir = './src/';

var resources_local_dir = 'res/',
    resources_dir = {
        'dist': dist_dir + resources_local_dir,
        'src': src_dir + resources_local_dir
    },
    scripts_local_dir = 'scripts/',
    scripts_dir = {
        'dist': dist_dir + scripts_local_dir,
        'src': src_dir + scripts_local_dir
    },
    styles_local_dir = 'styles/',
    styles_dir = {
        'dist': dist_dir + styles_local_dir,
        'src': src_dir + styles_local_dir
    },
    views_local_dir = 'views/',
    views_dir = {
        'dist': dist_dir + views_local_dir,
        'src': src_dir + views_local_dir,
    },
    view_index_path = src_dir + 'index.jade';

gulp.task('build', [
    'build-resources',
    'build-scripts',
    'build-styles',
    'build-views'
]);

gulp.task('build-jade', function () {
    return gulp.src(view_index_path)
        .pipe(jade())
        .pipe(gulp.dest(dist_dir));
});

gulp.task('build-javascript', function () {
    return browserify(scripts_dir['src'] + 'main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(scripts_dir['dist']));
});

gulp.task('build-less', function () {
    return gulp.src(styles_dir['src'] + '**/*.less')
        .pipe(less())
        .pipe(gulp.dest(styles_dir['dist']));
});

// Move everything in the ./src/res/ directory to the ./dist/res/ directory.
gulp.task('build-resources', function () {
    return gulp.src(resources_dir['src'] + '**/*')
        .pipe(gulp.dest(resources_dir['dist']));
});

gulp.task('build-scripts', [
    'build-javascript'
]);

gulp.task('build-styles', [
    'build-less'
]);

gulp.task('build-views', [
    'build-jade'
]);

gulp.task('default', function () {
    gulp.watch(resources_dir['src'], ['build-resources']);
    gulp.watch(scripts_dir['src'], ['build-scripts']);
    gulp.watch(styles_dir['src'], ['build-styles']);
    gulp.watch(views_dir['src'], ['build-views']);
    gulp.watch(view_index_path, ['build-views']);
});

