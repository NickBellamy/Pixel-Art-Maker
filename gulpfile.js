var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// Default task
gulp.task('default', ['serve']);

// Set up server and watch scss files
gulp.task('serve', ['styles'], function(){
    browserSync.init({
        server: './'
    });
  
    gulp.watch('sass/**/*.scss', ['styles']);
});

// Compile sass into CSS, add vendor prefixes, and sync with browser
gulp.task('styles', function(){
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}); 