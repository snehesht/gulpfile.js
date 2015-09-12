// Define your requirements
var gulp = require("gulp");
var sass = require("gulp-ruby-sass");  // Compiling Sass files. Require ruby's sass
var react = require('gulp-react'); 	// Compiling JSX to JS
var webserver = require('gulp-webserver'); // Gulp webserver to serve build files


// Define the paths of varioud folders
var paths = {
	src: 'src/',
	dest: 'build/',
	sass_watch: './src/**/*.scss',
	jsx: 'src/**/*.jsx'
	// scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
	// images: 'client/img/**/*'
	// gulp.src('./public/js/**/.')  http://bit.ly/1NeIyAF
};


// Compile Sass files with ruby sass ( gem install sass)
gulp.task('sass', function () {
	return sass(paths.src)
            .on('error', function (err) {
              console.error('error:', err.message);
            })
            .pipe(gulp.dest(paths.dest));
});


// React JSX task. Compile's all JSX files in the source directroty 
// with this command   gulp.src('./public/js/**/.')
gulp.task('compile-jsx', function () {
    return gulp.src(paths.jsx) 
        .pipe(react())
        .on('error', function (err) {
          console.error('error:', err.message);
        })
        .pipe(gulp.dest(paths.dest));
});


// Watch task 
gulp.task('watch',function(){
	// gulp.watch('path_to_file',['func_to_be_exec'])
	gulp.watch(paths.jsx, ['compile-jsx']), // Watches for the JSX files.
	gulp.watch(paths.sass_watch,['sass']) 	// Watches SASS files and compiles them
});


// Webserver on port 80 
gulp.task('webserver', function() {
  gulp.src(paths.dest) // Servers the Build directory files
    .pipe(webserver({
      host: 'localhost',
      port: 80,
      livereload: true,
      directoryListing: false,
      open: false
    }));
});


//  Default Task
gulp.task('default',['webserver','watch']);