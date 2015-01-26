'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      options: {
          livereload: true
      },
      reload: {
        files : ['*']
      },
      scss: {
          files: ['app/css/*.scss', 'app/css/*/*.scss'],
          tasks: ['sass', 'cssmin'],
          options: {
              spawn: false
          }
      },
      js: {
          files: ['app/js/**/*'],
          tasks: ['browserify', 'uglify'],
          options: {
              spawn: false
          }
      },
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/css',
          src: ['*.scss'],
          dest: 'app/css/build',
          ext: '.css'
        }]
      }
    }, 

    cssmin: {
      compile: {
        files: {
         'public/css/style.min.css': ['app/css/build/style.css']
        } 
      }
    },

    browserify: {
        options: {
            debug: true,
            watch: false,
            extensions: ['.jsx'],
            external: ['react']
        },
        dist: {
            src: 'app/js/app.jsx',
            dest: 'app/js/app_build.js'
        }
    },

    uglify: {
      compile: {
        files: {
        'public/js/app.min.js': ['app/js/app_build.js']
        }
      }
    },
  });

  // Load tasks from NPM

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['watch']);

};

