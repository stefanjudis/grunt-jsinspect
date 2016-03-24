/*
 * grunt-jsinspect
 *
 * Copyright (c) Stefan Judis and Juga Paazmaya
 * Licensed under the MIT license.
 */
'use strict';

var path = require('path');
var tmp = require('tmp');
var runTask = require('grunt-run-task');
var grunt = require('grunt');
var task = require('../tasks/jsinspect');
var write = process.stdout.write;


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.jsinspect = {
  setUp: function(done) {
    // cleanup the temporary files even when an uncaught exception occurs
    tmp.setGracefulCleanup();

    // mock process.stdout.write to have clean results
    process.stdout.write = function() {};
    runTask.loadTasks('tasks');
    done();
  },


  tearDown: function(callback) {
    process.stdout.write = write;
    callback();
  },


  registerTask: function(test) {
    task(grunt);

    test.strictEqual(grunt.task.exists('jsinspect'), true);

    test.done();
  },

  executeTask: {
    reporters: {
      defaultReporter: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                threshold: 5,
                failOnMatch: true
              },
              src: ['test/fixtures/*.js']
            }
          },
          function() {
            test.done();
          }
        );
      },

      suppressDefaultReporter: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                threshold: 5,
                failOnMatch: true,
                suppress: 0
              },
              src: ['test/fixtures/*.js']
            }
          },
          function() {
            test.done();
          }
        );
      },

      jsonReporter: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                threshold: 5,
                failOnMatch: true,
                reporter: 'json'
              },
              src: ['test/fixtures/*.js']
            }
          },
          function() {
            test.done();
          }
        );
      },

      pmdReporter: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                threshold: 5,
                failOnMatch: true,
                reporter: 'pmd'
              },
              src: ['test/fixtures/*.js']
            }
          },
          function() {
            test.done();
          }
        );
      },

      existantReporter: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                failOnMatch: false,
                threshold: 5,
                reporter: 'default'
              },
              src: ['test/fixtures/*.js']
            }
          },
          function(error) {
            test.strictEqual(typeof error, 'undefined');
            test.done();
          }
        );
      },

      notExistantReporter: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                threshold: 5,
                reporter: 'foo'
              },
              src: ['test/fixtures/*.js']
            }
          },
          function(error) {
            test.strictEqual(error instanceof Error, true);
            test.done();
          }
        );
      }
    },

    failOnMatch: {
      succeedOnMatch: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                failOnMatch: false,
                threshold: 5
              },
              src: ['test/fixtures/*.js']
            }
          },
          function(error) {
            test.strictEqual(typeof error, 'undefined');
            test.done();
          }
        );
      },

      failOnMatch: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                failOnMatch: true,
                threshold: 5
              },
              src: ['test/fixtures/*.js']
            }
          },
          function(error) {
            test.strictEqual(error instanceof Error, true);
            test.done();
          }
        );
      },

      succeedOnThresholdMatch: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                failOnMatch: 3,
                threshold: 5
              },
              src: ['test/fixtures/two-duplicates.js']
            }
          },
          function(error) {
            test.strictEqual(typeof error, 'undefined');
            test.done();
          }
        );
      },

      failOnThresholdMatch: function(test) {
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                failOnMatch: 1,
                threshold: 5
              },
              src: ['test/fixtures/two-duplicates.js']
            }
          },
          function(error) {
            test.strictEqual(error instanceof Error, true);
            test.done();
          }
        );
      }
    },

    reportToFile: function(test) {
      tmp.dir(function (err, tmpDir) {
        if (err) {
          throw err;
        }
        var outputPath = path.join(tmpDir, 'report.json');
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                threshold: 5,
                failOnMatch: true,
                reporter: 'json',
                outputPath: outputPath
              },
              src: ['test/fixtures/*.js']
            }
          },
          function() {
            var result = require(outputPath);
            test.ok(Array.isArray(result));
            test.strictEqual(result.length, 1);
            test.ok(result[0].hasOwnProperty('instances'));
            test.done();
          }
        );
      });
    },

    reportToFileInFolderThatDoesNotExist: function(test) {
      tmp.dir(function (err, tmpDir) {
        if (err) {
          throw err;
        }
        var outputPath = path.join(tmpDir, 'does/not/exist/report.json');
        runTask(
          'jsinspect:test',
          {
            test: {
              options: {
                threshold: 5,
                failOnMatch: true,
                reporter: 'json',
                outputPath: outputPath
              },
              src: ['test/fixtures/*.js']
            }
          },
          function() {
            var result = require(outputPath);
            test.ok(Array.isArray(result));
            test.strictEqual(result.length, 1);
            test.ok(result[0].hasOwnProperty('instances'));
            test.done();
          }
        );
      });
    },

    useConfigFile: function(test) {
      runTask(
        'jsinspect:test',
        {
          test: {
            options: {
              threshold: 50,
              failOnMatch: true,
              reporter: 'json',
              configFile: 'test/fixtures/config.json'
            },
            src: ['test/fixtures/*.js']
          }
        },
        function(error) {
          // With the high threshold there would be no error, but config file has low
          test.strictEqual(error instanceof Error, true);
          test.done();
        }
      );
    }
  }
};
