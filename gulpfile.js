var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require ('sass'));
var concat = require('gulp-concat');

var postcss = require('gulp-postcss');
var cssnano = require('cssnano');

var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
 
/**
 * Compile scss, bundle to app.css and minify.
 * Stream changes to browsersync
 */
gulp.task('css', function () {
    return gulp.src('./source/**/*.+(css|scss)')
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(autoprefixer({
           cascade: false
        }))
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.stream());
});
 
/**
 * Bundle and minify JS files to app.js
 * Stream changes to browsersync
 */
gulp.task('js', function () {
    return gulp.src('./source/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.stream());
});

/**
 * BrowserSync opens up a local development server on port 3000
 * If js/scss/html change is detected, run according gulp tasks
 */
function watch() {
    gulp.series('build');
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch("./source/scss/**/*.+(css|scss)", gulp.series('css'));
    gulp.watch("./source/js/**/*.js", gulp.series('js'));
    gulp.watch("./*.html").on('change', browserSync.reload);
}

/**
 * Build runs js & css tasks
 */
gulp.task('build', gulp.parallel('js','css'));

/**
 * Default task in this config is build
 */
gulp.task('default', gulp.series('build'));

/**
 * Start Browsersync and watch files for updates
 * 
 * Note: Doesn't want to work with the gulp.task() syntax
 */
exports.watch = gulp.series(watch);