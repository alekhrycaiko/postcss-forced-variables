var postcss = require('gulp-postcss');
var gulp = require('gulp');
var forcedVariables = require('./main.js');
var testVariables = require('./variables');
var ruleSet = require('./ruleset');
// setup a number of local tasks for manual tests.

gulp.task('success', function () {

    var processors = [
        forcedVariables({ruleset: ruleSet(), variables : testVariables()})
    ];
    return gulp.src('./test/pass-src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./test/dest'));
});


gulp.task('warn', function () {
    var processors = [
        forcedVariables({ruleset: ruleSet(), variables : testVariables()})
    ];
    return gulp.src('./test/warning-src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./test/dest'));
});


gulp.task('error', function () {

    var processors = [
        forcedVariables({ruleset: ruleSet(), variables : testVariables()})
    ];
    return gulp.src('./test/error-src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./test/dest'));
});


gulp.task('default', ['success']);
