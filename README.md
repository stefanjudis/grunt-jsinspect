[![Build Status](http://img.shields.io/travis/stefanjudis/grunt-jsinspect.svg)](https://travis-ci.org/stefanjudis/grunt-jsinspect) [![NPM version](http://img.shields.io/npm/v/grunt-jsinspect.svg)](http://badge.fury.io/js/grunt-jsinspect) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) [![Dependency Status](https://david-dm.org/stefanjudis/grunt-jsinspect.svg)](https://david-dm.org/stefanjudis/grunt-jsinspect)

![image](./logo.jpg)
# grunt-jsinspect

Grunt task for running [jsinspect](https://github.com/danielstjules/jsinspect).


## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsinspect --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsinspect');
```

## Config

```js
grunt.initConfig({
  jsinspect: {
    task : {
      options: {
        // Task-specific options go here.
      }
    }
  }
});
```
