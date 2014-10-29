/*
 * grunt-jsinspect
 *
 *
 * Copyright (c) Stefan Judis and Juga Paazmaya
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: true
      },
      all: ['Gruntfile.js', 'taks/**/*.js']
    },

    jsinspect: {
      dogfood: {
        options: {},
        src: ['tasks/*.js']
      }
    }

  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jsinspect']);
  grunt.registerTask('test', ['jshint']);
};
