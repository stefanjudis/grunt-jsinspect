/*
 * grunt-jsinspect
 *
 *
 * Copyright (c) Stefan Judis and Juga Paazmaya
 * Licensed under the MIT license.
 */

'use strict';

var Inspector = require('jsinspect/lib/inspector');
var Reporter = require('jsinspect/lib/reporters');

module.exports = function(grunt) {

  grunt.registerMultiTask('jsinspect', 'Grunt task for jsinspect', function() {
    var taskSucceeded = true;

    var options = this.options({
      threshold:   30,
      diff:        true,
      identifiers: false,
      failOnMatch: true
    });

    var inspector = new Inspector(this.filesSrc, {
      threshold:   options.threshold,
      diff:        options.diff,
      identifiers: options.identifiers
    });

    var reporterType = new Reporter.default(inspector, options.diff);

    if (options.failOnMatch) {
      inspector.on('match', function() {
        taskSucceeded = false;
      });
    }

    inspector.run();

    return taskSucceeded;
  });
};
