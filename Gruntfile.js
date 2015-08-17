// Generated on 2015-08-14 using
// generator-webapp 1.0.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // Configurable paths
  var config = {
    src: 'src',
    demo: 'demo',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      babel: {
        files: ['<%= config.src %>/scripts/{,*/}*.js'],
        tasks: ['babel:demo']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.src %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'postcss']
      },
      styles: {
        files: ['<%= config.src %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss']
      }
    },

    browserSync: {
      options: {
        notify: false,
        background: true
      },
      livereload: {
        options: {
          files: [
            '<%= config.src %>/{,*/}*.html',
            '.tmp/styles/{,*/}*.css',
            '<%= config.src %>/images/{,*/}*',
            '.tmp/scripts/{,*/}*.js'
          ],
          port: 9000,
          server: {
            baseDir: ['.tmp', config.src],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      demo: {
        options: {
          background: false,
          server: '<%= config.demo %>'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      demo: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.demo %>/*',
            '!<%= config.demo %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    eslint: {
      target: [
        'Gruntfile.js',
        '<%= config.src %>/scripts/{,*/}*.js',
        '!<%= config.src %>/scripts/vendor/*'
      ]
    },


    // Compiles ES6 with Babel
    babel: {
      options: {
        sourceMap: true
      },
      demo: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/scripts',
          src: '{,*/}*.js',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapContents: true,
        includePaths: ['.']
      },
      demo: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          // Add vendor prefixed styles
          require('autoprefixer-core')({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
          })
        ]
      },
      demo: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        src: ['<%= config.src %>/index.html'],
        ignorePath: /^(\.\.\/)*\.\./
      },
      sass: {
        src: ['<%= config.src %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /^(\.\.\/)+/
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      demo: {
        src: [
          '<%= config.demo %>/scripts/{,*/}*.js',
          '<%= config.demo %>/styles/{,*/}*.css',
          '<%= config.demo %>/images/{,*/}*.*',
          '<%= config.demo %>/styles/fonts/{,*/}*.*',
          '<%= config.demo %>/*.{ico,png}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.demo %>'
      },
      html: '<%= config.src %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.demo %>',
          '<%= config.demo %>/images',
          '<%= config.demo %>/styles'
        ]
      },
      html: ['<%= config.demo %>/{,*/}*.html'],
      css: ['<%= config.demo %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the demo folder
    imagemin: {
      demo: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.demo %>/images'
        }]
      }
    },

    svgmin: {
      demo: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.demo %>/images'
        }]
      }
    },

    htmlmin: {
      demo: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          // true would impact styles with attribute selectors
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.demo %>',
          src: '{,*/}*.html',
          dest: '<%= config.demo %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      demo: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.src %>',
          dest: '<%= config.demo %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.src %>',
          dest: '<%= config.dist %>',
          src: [
            'templates/{,*/}*.html',
            'styles/{,*/}*.scss',
            'scripts/{,*/}*.js',
            '!styles/main.scss',
            '!scripts/main.js'
          ]
        }]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'babel:demo',
        'sass:server'
      ],
      demo: [
        'babel',
        'sass',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app', function(target) {

    if (target === 'demo') {
      return grunt.task.run(['build', 'browserSync:demo']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'postcss',
      'browserSync:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });


  grunt.registerTask('build', [
    'clean:demo',
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:demo',
    'postcss',
    'concat',
    'cssmin',
    'uglify',
    'copy:demo',
    'copy:dist',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:eslint',
    'build'
  ]);
};