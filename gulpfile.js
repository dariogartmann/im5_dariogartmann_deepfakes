var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require ('sass'));
var concat = require('gulp-concat');

var postcss = require('gulp-postcss');
var cssnano = require('cssnano');

var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
 
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
 
gulp.task('js', function () {
    return gulp.src('./source/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.stream());
});

gulp.task('build', gulp.series('js','css'));

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

gulp.task('default', gulp.series('build'));

exports.watch = gulp.series(watch);