/*
 * grunt-jsinspect
 *
 *
 * Copyright (c) 2014 Stefan Judis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('jsinspect', 'Grunt task for jsinspect', function() {

    var options = this.options({
      threshold: 30,
      identifiers: false
    });

    var done = this.async;

    var args = [
      '-t',
      options.threshold
    ];

    if (options.identifiers) {
      args.push('-i');
    }

    args.push(this.filesSrc.join(' '));
    
    var opts = {
      cmd: 'jsinspect',
      args: args
    };
    grunt.util.spawn(opts, function(error, result, code) {
      if (error) {
        grunt.log.error(error);
      }
      grunt.log.writeln(result);
      grunt.log.writeln(code);

      done();
    });

  });
};
