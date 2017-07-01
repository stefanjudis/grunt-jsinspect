/*
 * grunt-jsinspect
 *
 * Copyright (c) Stefan Judis and Juga Paazmaya
 * Licensed under the MIT license.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const strip = require('strip-json-comments');
const Inspector = require('jsinspect/lib/inspector');
const Reporter = require('jsinspect/lib/reporters');

module.exports = function(grunt) {

  grunt.registerMultiTask('jsinspect', 'Grunt task for jsinspect', function() {
    const done = this.async();
    let taskSucceeded = true;
    let nbOfMatches = 0;

    const options = this.options({
      // jsinspect options
      threshold:    30,
      identifiers:  false,
      literals:     true,
      truncate:     100,
      minInstances: 2,
      reporter:     'default',

      // options used for grunt-jsinspect
      failOnMatch:  true,
      configFile:   '.jsinspectrc'
    });

    let configStat;
    try {
      configStat = fs.lstatSync(options.configFile);
    } catch (error) {
      // There is no config file
    }

    if (configStat && configStat.isFile()) {
      const contents = strip(fs.readFileSync(options.configFile, 'utf8'));
      let rc;
      try {
        rc = JSON.parse(contents);
      } catch (error) {
        throw new Error('The JSON configuration file (' + options.configFile + ') is not valid.');
      }

      Object.keys(options).forEach(function (key) {
        if (rc.hasOwnProperty(key)) {
          options[key] = rc[key];
        }
      });
    }

    const inspector = new Inspector(this.filesSrc, {
      threshold:    options.threshold,
      literals:     options.literals,
      minInstances: options.minInstances,
      identifiers:  options.identifiers
    });

    if (!Reporter.hasOwnProperty(options.reporter) ||
        typeof Reporter[options.reporter] !== 'function') {
      grunt.log.error('Sorry but the configured reporter "' + options.reporter +
        '" does not exist, thus exiting');
      done(false);

      return;
    }

    var writableStream;
    if (typeof options.outputPath === 'string') {
      // The user wants the output to be written to a file, so pass a writable stream as an option to the reporter.
      var dir = path.dirname(options.outputPath);
      if (dir) {
          grunt.file.mkdir(dir);
      }
      writableStream = fs.createWriteStream(options.outputPath, {encoding: 'utf8', flags: 'w'});
    }

    this.reporterType = new Reporter[options.reporter](inspector, {
      writableStream: writableStream,
      truncate: options.truncate,
      identifiers: options.identifiers
    });

    if (typeof options.failOnMatch === 'number') {
      // Handle failOnMatch threshold.
      inspector.on('match', function() {
        nbOfMatches++;
        if (nbOfMatches >= options.failOnMatch) {
          taskSucceeded = false;
        }
      });
    } else if (options.failOnMatch === true) {
      // Handle failOnMatch boolean.
      inspector.on('match', function() {
        taskSucceeded = false;
      });
    }

    if (writableStream) {
      writableStream.on('finish', function() {
        done(taskSucceeded);
      });
      writableStream.on('open', function() {
        inspector.run();
      });
    } else {
      inspector.on('end', function() {
        done(taskSucceeded);
      });
      inspector.run();
    }
  });
};
