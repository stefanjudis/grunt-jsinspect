[![Build Status](http://img.shields.io/travis/stefanjudis/grunt-jsinspect.svg)](https://travis-ci.org/stefanjudis/grunt-jsinspect)
[![NPM version](http://img.shields.io/npm/v/grunt-jsinspect.svg)](http://badge.fury.io/js/grunt-jsinspect)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Dependency Status](https://david-dm.org/stefanjudis/grunt-jsinspect.svg)](https://david-dm.org/stefanjudis/grunt-jsinspect)

![image](./logo.jpg)
# grunt-jsinspect

[Grunt](http://gruntjs.com/) task for running [jsinspect](https://github.com/danielstjules/jsinspect) in order to detect copy-pasted and structurally similar JavaScript code.


## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven’t used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to
create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and
use Grunt plugins. Once you’re familiar with that process, you may install this
plugin with this command:

```shell
npm install grunt-jsinspect --save-dev
```

Once the plugin has been installed, it may be enabled inside your `Gruntfile.js`
file with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsinspect');
```

## Configuration and available options

A simple configuration example with the default options.

```js
grunt.initConfig({
  jsinspect: {
    examples: {
      options: {
        threshold:   30,
        diff:        true,
        identifiers: false,
        failOnMatch: true,
        suppress:    100,
        reporter:    'default',
        configFile:  '.jsinspectrc'
      },
      src: [
        '**/*.js'
      ]
    }
  }
});
```

Execute with `grunt jsinspect:examples`.

### src

Type: `string|array`

Globbing pattern to get files to run `grunt-jsinspect` against.

*Site note: In case you want to ignore files you can do this with prepending `!`.*

```
grunt.initConfig({
  jsinspect: {
    examples: {
      src: [
        '**/*.js',
        '!**/node_modules/**'  // ignore node_modules folder
      ]
    }
  }
});
```

### options.threshold

Type: `number`

Default value: `30`

Number of nodes


### options.diff

Type: `boolean`

Default value: `true`


### options.identifiers

Type: `boolean`

Default value: `false`

Match identifiers


### options.reporter

Type: `string`

Default value: `'default'`

Specify the reporter to use.
Possible values: `'default'`, `'json'`, and `'pmd'`.


### options.outputPath

Type: `string`

Default value: `undefined`

Specify the path of the output file.
The destination directory must already exist.
You’ll probably want to pick a file extension which corresponds with the chosen [reporter](#reporter).


### options.suppress

Type: `number`

Default value: `100`

Length to suppress diffs.
Use `0` to disable.


### options.failOnMatch

Type: `boolean|number`

Default value: `'true'`

Use a number as a threshold (e.g. use `42` to pass for 41 matches but fail beyond 42 matches).


### options.configFile

Type: `string`

Default value: `'.jsinspectrc'`

In case the given JSON file exists, it will be used for setting the configuration options.
Please [see the `jsinspect` for details](https://github.com/danielstjules/jsinspect#usage).


## License

Copyright (c) Stefan Judis and Juga Paazmaya, licensed under [the MIT license](LICENSE-MIT)

