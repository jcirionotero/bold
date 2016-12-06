const del = require('del');

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const Reporters = require('jasmine-reporters');
const TerminalReporter = require('jasmine-terminal-reporter');

const paths = {
  'lint': [
    './gulpfile.js',
    './server/**/*.js',
    './common/**/*.js',
    './test/**/*.js'
  ],
  'unitTests': [
    './test/unit/**/*.js',
    '!test/unit/{temp,fixtures,temp/**,fixtures/**}'
  ],
  'source': [
    './common/**/*.js',
    './server/**/*.js',

    // Exclude base classes
    '!./common/classes/model-conf.js',

    // Exclude auto-generated scripts (except modified ones).
    '!./server/server.js',
    '!./server/boot/root.js'

    // Exclude config scripts

    // Exclude unmodified models
  ]
};

const plumberConf = {};
let failOnError = false;

const istanbulConf = { 'includeUntested': true };

const istanbulReportsConf = {
  'dir': './test-results/coverage',
  'reporters': ['lcov', 'json', 'text', 'text-summary', 'teamcity']
};

const thresholdsConf = {
  'thresholds': {
    'global': {
      'statements': 100,
      'branches': 100,
      'lines': 100,
      'functions': 100
    }
  }
};

const jasmineConf = {
  'verbose': true,
  'includeStackTrace': true,
  'reporter': [
    new Reporters.JUnitXmlReporter({
      'consolidateAll': true,
      'savePath': './test-results/unit-tests'
    }),
    new TerminalReporter({
      'isVerbose': true,
      'showColors': true,
      'includeStackTrace': true
    })
  ]
};

if (process.env.CI) {
  plumberConf.errorHandler = function (error) {
    throw error;
  };
}

gulp.task('clean', done => {
  del(['test-results/'], done);
});

gulp.task('lint', () => {
  let task = gulp.src(paths.lint)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());

  if (failOnError) {
    task = task.pipe(plugins.eslint.failOnError());
  }

  return task;
});

gulp.task('unit', done => {
  gulp.src(paths.source)
    .pipe(plugins.istanbul(istanbulConf))
    .pipe(plugins.istanbul.hookRequire())
    .on('finish', () => {
      gulp.src(paths.unitTests)
        .pipe(plugins.plumber(plumberConf))
        .pipe(plugins.jasmine(jasmineConf))
        .pipe(plugins.istanbul.writeReports(istanbulReportsConf))
        .pipe(plugins.istanbul.enforceThresholds(thresholdsConf))
        .on('finish', () => {
          process.chdir(__dirname);
          done();
        });
    });
});

gulp.task('noFail', () => {
  failOnError = false;
});

gulp.task('test', ['clean', 'lint', 'unit']);

gulp.task('watch', ['noFail', 'unit'], () => {
  const watch = paths.lint.concat(paths.unitTests);
  gulp.watch(watch, () => {
    /* eslint global-require: 'off' */
    // Using child process, otherwise will get error.
    require('child_process').spawn('gulp', ['noFail', 'unit'], {
      'env': process.env,
      'cwd': process.cwd(),
      'stdio': [
        process.stdin,
        process.stdout,
        process.stderr
      ]
    });
  });
});

gulp.task('default', ['watch']);
