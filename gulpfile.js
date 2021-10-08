const gulp = require('gulp')
const browser = require('browser-sync')
const concat = require('gulp-concat')
const gulpMerge = require('gulp-merge')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const rollup = require('@rollup/stream')

// *Optional* Depends on what JS features you want vs what browsers you need to support
// *Not needed* for basic ES6 module import syntax support
const babel = require('@rollup/plugin-babel')

// Add support for require() syntax
const commonjs = require('@rollup/plugin-commonjs')

// Add support for importing from node_modules folder like import x from 'module-name'
const nodeResolve = require('@rollup/plugin-node-resolve')
const json = require('@rollup/plugin-json')

// Cache needs to be initialized outside of the Gulp task
var cache

const appJsList = ['./src/channels/*.js', './src/app.js']
const vendorJsList = ['./assets/js/vendors/cocos2d-js-v3.13.js', './node_modules/phoenix/priv/static/phoenix.min.js']

gulp.task('watch', function () {
  gulp.watch('*.html').on('change', browser.reload)
  gulp.watch(['./src/**/*.js', './src/**/*.json'], gulp.series('compile-js')).on('change', browser.reload)

  browser.init({ server: './', port: 8000 })
})

gulp.task('compile-vendors', function () {
  return gulpMerge(gulp.src(vendorJsList)).pipe(concat('vendors.js')).pipe(gulp.dest('dist/'))
})

gulp.task('compile-js', function () {
  return (
    rollup({
      // Point to the entry file
      input: './src/app.js',

      // Apply plugins
      plugins: [babel.babel(), commonjs(), nodeResolve.nodeResolve(), json()],

      // Use cache for better performance
      cache: cache,

      // Note: these options are placed at the root level in older versions of Rollup
      output: {
        // Output bundle is intended for use in browsers
        // (iife = "Immediately Invoked Function Expression")
        format: 'iife',

        // Show source code when debugging in browser
        sourcemap: true,
      },
    })
      .on('bundle', function (bundle) {
        // Update cache data after every bundle is created
        cache = bundle
      })
      // Name of the output file.
      .pipe(source('app.js'))
      .pipe(buffer())

      // The use of sourcemaps here might not be necessary,
      // Gulp 4 has some native sourcemap support built in
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))

      // Where to send the output file
      .pipe(gulp.dest('./dist'))
  )
})

gulp.task('default', gulp.series('compile-vendors', 'compile-js', 'watch'))
