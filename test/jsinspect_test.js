/*
 * grunt-jsinspect
 *
 * Copyright (c) Stefan Judis and Juga Paazmaya
 * Licensed under the MIT license.
 */

var runTask = require('grunt-run-task');
var grunt = require('grunt');
var task = require('../tasks/jsinspect');
var write = process.stdout.write;

'use strict';

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
    // mock process.stdout.write to have clean results
    process.stdout.write = function() {};
    runTask.loadTasks('tasks');
    done();
  },


  tearDown : function(callback) {
    process.stdout.write = write;

    callback();
  },


  registerTask: function(test) {
    task(grunt);

    test.strictEqual(grunt.task.exists('jsinspect'), true);

    test.done();
  },

  executeTask: {
    reporters : {
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
          function(a) {
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
          function(a) {
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
          function(a) {
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
          function(a) {
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

    failOnMatch : {
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
      }
    }
  }
};
