var postcss = require('gulp-postcss');
var gulp = require('gulp');
var forcedvariables = require('./main.js');
var testVariables = require('./variables');
var ruleSet = require('./ruleset');
gulp.task('css', function () {

    var processors = [
        forcedvariables({ruleset : ruleSet(), variables : testVariables()})
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});


gulp.task('default', ['css']);
