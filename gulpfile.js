const gulp = require('gulp');
const less = require('gulp-less');
var del = require('del');
const rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var ngTemplates = require('gulp-angular-templatecache');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ignore = require('gulp-ignore');


gulp.task('less-dev', async function () {
    return gulp.src('src/style.less',{allowEmpty:true})
        .pipe(less())
        .pipe(gulp.dest('gen'))
});

gulp.task('less-prod', async function () {
    return gulp.src('src/style.less')
        .pipe(less())
        .pipe(rename('experiment-style.css')
            .pipe(gulp.dest('dist')))
        .pipe(cssnano({
            zIndex: false
        }))
});

gulp.task('template', async function () {
    return gulp.src('src/**/*.html',{allowEmpty: true})
        .pipe(ngTemplates({
            module: 'experiment'
        }))
        .pipe(rename('experimental-components.tpl.js'))
        .pipe(gulp.dest('gen'));
});


gulp.task('lint', async function () {
    return gulp.src(['src/**/*.js', 'test/**/*_spec.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('scripts-dev', async function () {
    return gulp.src(['src/experimental-components.js', 'src/**/*.js'],{allowEmpty: true})
      .pipe(concat('experimental-components.js'))
      .pipe(gulp.dest('gen'));
  });
gulp.task('scripts-prod', async function () {
    return gulp.src(['src/experimental-components.js', 'src/**/*.js'],{allowEmpty: true})
        .pipe(concat('experimental-components.js'))
        .pipe(gulp.dest('dist'))
        .pipe(ignore.exclude([ "**/*.map" ]))
        .pipe(uglify())
        .pipe(rename('experimental-components.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts-prod-tpls', gulp.series('template', async function () {
    return gulp.src(['src/experimental-components.js', 'src/**/*.js', 'gen/experimental-components.tpl.js'], { allowEmpty: true })
        .pipe(concat('experimental-components.tpls.js'))
        .pipe(gulp.dest('dist'))
        .pipe(ignore.exclude([ "**/*.map" ]))
        .pipe(uglify())
        .pipe(rename('experimental-components.tpls.min.js'))
        .pipe(gulp.dest('dist'));
}));

gulp.task('watch', async function () {
    gulp.watch('src/**/*.js', gulp.series('lint','scripts-dev'))
    gulp.watch('src/style.less', gulp.series('less-dev'))
    gulp.watch('src/**/*.html', gulp.series('template'))

});

gulp.task('clean', async function (cb) {
    await del(['dist', 'gen'], cb);
});


gulp.task('default', gulp.series('clean',gulp.parallel('less-dev','scripts-dev','template','watch')));
gulp.task('production', gulp.series('clean',gulp.parallel('less-prod','scripts-prod','scripts-prod-tpls')));
gulp.task('dev', gulp.series('clean',gulp.parallel('less-dev','scripts-dev','template')));

