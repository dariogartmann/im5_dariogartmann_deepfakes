var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
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
            baseDir: '/'
        }
    });

    gulp.watch("./source/scss/**/*.+(css|scss)", ["css"]);
    gulp.watch("./source/js/**/*.js", ["js"]);
    gulp.watch("./*.html", reload);
});

gulp.task('default', gulp.series('build'));