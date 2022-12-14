var gulp = require('gulp');
var sass = require('gulp-sass')(require ('sass'));
var concat = require('gulp-concat');

const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

var uglify = require('gulp-uglify');
var prompt = require('gulp-prompt');
var ftp = require( 'vinyl-ftp' );
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


gulp.task('deploy', gulp.series('js','css'), function() {
    gulp.src('/').pipe(prompt.prompt({
        type: 'password',
        name: 'pass',
        message: 'Please enter your password'
    }, function(res){
        var conn = ftp.create( {
            host:     'ftp.informatik.sg',
            user:     'gruppe1-ina4a@informatik.sg',
            password: res.pass,
            parallel: 10
        } );

        var globs = [
            './assets/**',
            'index.html',
            'favicon.png'
        ];

        // using base = '.' will transfer everything to /public_html correctly
        // turn off buffering in gulp.src for best performance
        return gulp.src( globs, { base: '.', buffer: false } )
            .pipe( conn.newer( '/' ) ) // only upload newer files
            .pipe( conn.dest( '/' ) );
    }));
    
});
 
gulp.task('serve', gulp.series('js','css'), function() {
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

gulp.task('default', gulp.series('serve'));