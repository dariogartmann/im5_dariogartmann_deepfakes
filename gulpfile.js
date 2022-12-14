var gulp = require('gulp');
var sass = require('gulp-sass')(require ('sass'));
var concat = require('gulp-concat');

const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

var uglify = require('gulp-uglify');
var prompt = require('gulp-prompt');
var browserSync = require('browser-sync').create();
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
        .pipe(browserSync.reload({stream: true}));
 
});
 
gulp.task('js', function () {
    return gulp.src('./source/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build', gulp.series('js','css'), function() {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });

    gulp.watch("./source/scss/**/*.+(css|scss)", ["css"]);
    gulp.watch("./source/js/**/*.js", ["js"]);
    gulp.watch("./*.html").on('change', () => {
        browserSync.reload();
    });
});

gulp.task('default', gulp.series('build'));