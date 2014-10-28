/*
 * grunt-jsinspect
 *
 *
 * Copyright (c) 2014 Stefan Judis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    jsinspect: {
      dogfood: {
        options: {
        },
        src: ['tasks/*.js']
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jsinspect']);
};
