module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "requirejs" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', [
    'uglify',
    'requirejs'
  ]);

};
