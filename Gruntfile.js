// Generated on 2014-04-30 using generator-webapp 0.4.6
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    gos: {
      // Configurable paths
      src: 'src',
      dist: 'dist',
      demo: 'demo',
      namespace: 'cards'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= gos.src %>/js/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['<%= gos.src %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= gos.src %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      jade: {
        files: ['<%= gos.src %>/{,*/}*.jade'],
        tasks: ['jade']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.tmp/{,*/}*.html',
          '{.tmp,<%= gos.src %>}/styles/{,*/}*.css',
          '{.tmp,<%= gos.src %>}/js/{,*/}*.js',
          '<%= gos.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '*'
      },
      livereload: {
        options: {
          open: 'http://0.0.0.0:9000',
          base: [
            '.tmp',
            '<%= gos.src %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= gos.src %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= gos.dist %>',
          livereload: false
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
            '<%= gos.dist %>/*',
            '!<%= gos.dist %>/.git*'
          ]
        }]
      },
      demo: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= gos.demo %>/*',
            '!<%= gos.demo %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= gos.src %>/js/{,*/}*.js',
        '!<%= gos.src %>/js/vendor/*'
      ]
    },


    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= gos.src %>/styles',
        cssDir: '.tmp/styles',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= gos.dist %>/assets',
          outputStyle: 'nested',
          noLineComments: true
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    'bower-install': {
      app: {
        html: '<%= gos.src %>/index.jade',
        ignorePath: '<%= gos.src %>/'
      }
    },

    jade: {
      dist: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= gos.src %>',
          dest: '.tmp',
          src: ['**/*.jade', '!**/layouts/**'],
          ext: '.html'
        }]
      },
      demo: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= gos.src %>',
          dest: '.tmp',
          src: ['**/*.jade', '!**/layouts/**'],
          ext: '.html'
        }]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '.tmp/index.html',
      options: {
        dest: '<%= gos.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= gos.dist %>']
      },
      html: ['<%= gos.dist %>/{,*/}*.html'],
      css: ['<%= gos.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= gos.src %>/assets',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= gos.dist %>/assets'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= gos.src %>/assets',
          src: '{,*/}*.svg',
          dest: '<%= gos.dist %>/assets'
        }]
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp',
          src: '{,*/}*.html',
          dest: '<%= gos.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= gos.src %>',
          dest: '<%= gos.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'assets/**/**.*',
            '{,*/}*.html',
            'fonts/{,*/}*.*',
            'js/*.js',
            '!js/app.js'
          ]
        }]
      },
      demo: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.tmp',
          dest: '<%= gos.demo %>',
          src: [
            '{,*/}*.html',
            'js/*.js',
            'templates/**.html',
            'styles/*.css'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= gos.src %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },

      js: {
        expand: true,
        cwd: '<%= gos.src %>/js',
        dest: '.tmp/js/',
        src: '{,*/}*.js'
      },

      // copy scss files into dist folder
      // need both minified and unminified
      stylesDist: {
        expand: true,
        dot: true,
        cwd: '<%= gos.src %>/styles',
        dest: '<%= gos.dist %>/styles/',
        src: ['{,*/}*.scss', '!style.scss'],
        rename: function(dest, src) {
          return dest + src.replace('_', '');
        }
      },

      // compile scss to css
      // minify and concat
      stylesDemo: {
        expand: true,
        dot: true,
        cwd: '.tmp/styles',
        dest: '<%= gos.dist %>/styles/',
        src: '{,*/}*.scss'
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= gos.dist %>/js/<%= gos.namespace %>.min.js': ['<%= gos.src %>/js/**.js', '<%= gos.src %>/js/app.js']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '.tmp/styles',
          src: ['*.css', '!*.min.css'],
          dest: '<%= gos.dist %>/styles',
          ext: '.min.css'
        }]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'compass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'compass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ],
      demo: [
        'compass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'jade:dist',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function() {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer',
      ]);
    }

    grunt.task.run([
      'connect:test'
    ]);
  });

  grunt.registerTask('demo', [
    'clean:demo',
    'jade:demo',
    'useminPrepare',
    'copy:js',
    'concurrent:demo',
    'autoprefixer',
    // 'concat',
    // 'copy:stylesDemo',
    'cssmin',
    // 'uglify',
    // 'htmlmin',
    'copy:demo',
    'usemin'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jade:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    // 'concat',
    'copy:stylesDist',
    // 'cssmin',
    'uglify',
    // 'htmlmin',
    'copy:dist',
    'usemin'
  ]);

  grunt.registerTask('default', [
    // 'newer:jshint',
    // 'test',
    'build'
  ]);
};