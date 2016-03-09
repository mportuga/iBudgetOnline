module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production: {
        options: {
          paths: ["public/css"],
          plugins: [
            new (require('less-plugin-clean-css'))()
          ],
        },
        files: {
          "public/css/main.css": "src/less/main.less",
          "public/css/desktop.css": "src/less/desktop.less"
        }
      }
    },
    uglify: {
      my_target: {
        files: [
          {
            expand: true,
            cwd: 'src/js/vendor',
            src: '**/*.js',
            dest: 'public/js/vendor'
          },
          {
            'public/js/require-config.js': ['src/js/require-config.js']
          }
        ]
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src/js",
          mainConfigFile: "src/js/require-config.js",
          name: "main",
          include: [ "main" ],
          paths: {
            d3: 'empty:',
            foundation: 'empty:',
            jquery: 'empty:',
            jqueryDataTables: 'empty:',
            lodash: 'empty:',
            modernizr: 'empty:',
            nvd3: 'empty:'
          },
          out: "public/js/main.js"
        }
      }
    }
  });

  // Load all grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', [
    'less',
    'uglify',
    'requirejs'
  ]);

};
