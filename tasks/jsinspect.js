/*
 * grunt-jsinspect
 *
 * Copyright (c) Stefan Judis and Juga Paazmaya
 * Licensed under the MIT license.
 */

'use strict';

var Inspector = require('jsinspect/lib/inspector');
var Reporter = require('jsinspect/lib/reporters');

module.exports = function(grunt) {

  grunt.registerMultiTask('jsinspect', 'Grunt task for jsinspect', function() {
    var done = this.async();
    var taskSucceeded = true;

    var options = this.options({
      threshold:   30,
      diff:        true,
      identifiers: false,
      failOnMatch: true,
      suppress:    100,
      reporter:    'default'
    });

    var inspector = new Inspector(this.filesSrc, {
      threshold:   options.threshold,
      diff:        options.diff,
      identifiers: options.identifiers
    });

    if (!Reporter.hasOwnProperty(options.reporter) ||
        typeof Reporter[options.reporter] !== 'function') {
      grunt.log.error('Sorry but the configured reporter "' + options.reporter +
        '" does not exist, thus exiting');
      done(false);

      return;
    }

    this.reporterType = new Reporter[options.reporter](inspector, {
      diff: options.diff,
      suppress: options.suppress
    });

    if (options.failOnMatch) {
      inspector.on('match', function() {
        taskSucceeded = false;
      });
    }

    inspector.on('end', function() {
      done(taskSucceeded);
    });

    inspector.run();

  });
};
