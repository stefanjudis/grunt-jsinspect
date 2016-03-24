/*
 * grunt-jsinspect
 *
 * Copyright (c) Stefan Judis and Juga Paazmaya
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    eslint: {
      options: {
        config: '.eslintrc.json'
      },
      all: ['Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>']
    },

    jsinspect: {
      dogfood: {
        options: {},
        src: ['tasks/*.js']
      },
      test: {
        options: {
          threshold: 5,
          failOnMatch: false,
          reporter: 'default'
        },
        src: ['test/fixtures/*.js']
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['jsinspect:dogfood']);
  grunt.registerTask('test', ['eslint', 'jsinspect:test', 'nodeunit']);
};
