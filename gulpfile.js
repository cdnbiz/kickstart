var gulp = require("gulp"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    // developer has deprecated and recommended cssnano instead
    // cssmin = require("gulp-minify-css"),
    cssnano = require("gulp-cssnano"),
    inlinesrc = require("gulp-inline-source"),
    htmin = require("gulp-htmlmin"),
    uglify = require("gulp-uglify");

gulp.task("default", ["scripts", "styles", "html", "images", "inline"]);

gulp.task("watch", function(){
  gulp.watch("./src/js/*.js", ["scripts"]);
  gulp.watch("./src/scss/*.scss", ["styles"]);
  gulp.watch("./src/**/*.html", ["html"]);
  gulp.watch("./src/img/*.*", ["images"]);
});

gulp.task("scripts", function(){

  gulp.src("./src/js/*.js")
      .pipe(concat("script.js"))
      .pipe(uglify())
      .pipe(gulp.dest("./dist/js"));

});

gulp.task("styles", function(){

  gulp.src("./src/scss/*.scss")
      .pipe(concat("style.css"))
      .pipe(sass())
      .pipe(cssnano())
      .pipe(gulp.dest("./dist/css"));

});

gulp.task("html", function(){

  gulp.src("./src/**/*.html")
      .pipe(htmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS:true
        }))
      .pipe(gulp.dest("./dist"));

});


gulp.task("images", function(){

  gulp.src("./src/img/*")
      .pipe(gulp.dest("./dist/img"));

});

// Gulp task to inline css for faster rendering
gulp.task("inline", function(){

gulp.src("./dist/**/*.html")
  .pipe(inlinesrc())
  .pipe(gulp.dest("./dist"));

});
