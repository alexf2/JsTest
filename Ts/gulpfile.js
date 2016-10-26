var gulp = require('gulp'),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json"),
    rimraf = require("rimraf");

var browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    tsify = require("tsify");

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var open = require('gulp-open');

var paths = { pages: ['src/*.html'], dst: 'dist'};

gulp.task("clean:js", function (cb) {
    rimraf(paths.ds + '/*.{js,map}', cb);
});

gulp.task("copy-html", ["clean:js"], function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(paths.dst));
});

gulp.task("default", ["copy-html"], function () {
    /*return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(paths.dst));*/

    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))

    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())
    .pipe(sourcemaps.write('./'))    

    .pipe(gulp.dest(paths.dst));
});

gulp.task('run', function(){
    var options = {        
        app: 'chrome'
    };
    gulp.src('dist/index.html')
        .pipe(open(options));
});
