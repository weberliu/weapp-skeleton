var gulp = require('gulp')
var less = require('gulp-less')
var rename = require('gulp-rename')
var postcss = require('gulp-postcss')
var cssnano = require('gulp-cssnano')
var header = require('gulp-header')
var autoprefixer = require('autoprefixer')
var bower = require('gulp-bower')
var pkg = require('./package.json')
var env = process.env.NODE_ENV || 'development'

gulp.task('watch', function () {
  gulp.watch('src/**', ['build:style', 'build:app'])
})
gulp.task('build:style', function () {
  var banner = [
    '/*!',
    ' * Prints v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= new Date().getFullYear() %> Weber Liu',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    ''
  ].join('\n')
  gulp
    .src(['src/style/weui.wxss', 'src/app/*.wxss'], { base: 'src' })
    .pipe(less())
    .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
    .pipe(
      cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: { removeAll: true }
      })
    )
    .pipe(header(banner, { pkg: pkg }))
    .pipe(
      rename(function (path) {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest('dist'))
})
gulp.task('build:app', function () {
  gulp
    .src(
    [
      'src/app.js',
      'src/app.json',
      'src/app.wxss',
      'src/app/**',
      '!src/app/*.wxss',
      'src/config.js',
      'src/config/**',
      '!src/config/service.*'
    ],
      { base: 'src' }
    )
    .pipe(gulp.dest('dist'))
})
gulp.task('build:service', function () {
  gulp
    .src('src/config/service.' + env + '.js')
    .pipe(rename('config/service.js'))
    .pipe(gulp.dest('dist/'))
})
gulp.task('build', ['build:style', 'build:app', 'build:service'])
gulp.task('bower', function () {
  return bower('./src/vendor')
    .pipe(gulp.dest('dist/vendor'))
})

gulp.task('default', ['watch', 'build'])
