/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyes');
var sourcemaps = require('gulp-sourcemaps');

// Default task
gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint'], function(){
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['lint']);
    gulp.watch('./dist/index.html').on('change', browserSync.reload);
    gulp.watch('./index.html', ['copy-html']);
    gulp.watch('img/*', ['copy-images']);

    // Browser Sync; change server between './' for dev and './dist' for production
    browserSync.init({
        //server: './'
        server: './dist'
    });
});

gulp.task('dist', [
    'copy-html',
    'copy-images',
    'styles',
    'lint',
    'scripts-dist'
]);

// Task to handle js in production
gulp.task('scripts-dist', function(){
    return gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

// ESLint
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['js/**/*.js','!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property 
    // of the file object so it can be used by other modules. 
        .pipe(eslint())
    // eslint.format() outputs the lint results to the console. 
    // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
    // To have the process exit with an error code (1) on 
    // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});

// Copy HTML to dist folder
gulp.task('copy-html', function(){
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
});

// Copy images to dist folder
gulp.task('copy-images', function(){
    gulp.src('img/*')
        .pipe(gulp.dest('./dist/img'));
});

// Compile sass into CSS, add vendor prefixes, and sync with browser
gulp.task('styles', function(){
    gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}); 