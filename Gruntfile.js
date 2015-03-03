module.exports = function(grunt) {

  // All configuration goes here 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        preserveComments: 'some'
      },
      my_target: {
         files: {
          'jquery.trackpad-scroll-emulator.min.js': ['jquery.trackpad-scroll-emulator.js']
        }
      }
    }

  });

  // Tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['uglify']);

};