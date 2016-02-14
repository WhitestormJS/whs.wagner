var gulp = require('gulp');
var beautify = require('gulp-beautify');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var rename = require("gulp-rename");

/* =========================== GULP COMMANDS =========================== */

// Build command.
gulp.task('build', function() {

    gulp.src('src/Wagner.js')
        .pipe(rename('whs.wagner.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(beautify())
        .pipe(gulp.dest('./build/'));

    gulp.src('src/Wagner.js')
        .pipe(rename('whs.wagner.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));

});
