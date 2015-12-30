var gulp = require('gulp'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean');

var paths = {
  dist: ['./dist/']
};

gulp.task('default', function () {
    connect.server({
        port: 8888
    });
});

gulp.task('clean', function(done) {
  gulp.src(paths.dist, { read: false })
    .pipe(clean());
  done();
});