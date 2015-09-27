module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            app: '<%= _.slugify(appname) %>',
            assets: 'assets/sass/',
            scss: ['<%= project.assets %>main.scss']
        },
        sass: {
            dev: {
                options: {
                    style: 'nested',
                    precision: 5,
                    sourcemap: 'none'
                },
                files: {
                    '<%= project.assets %>../css/main.css': '<%= project.scss %>'
                }
            },
            dist: {
                options: {
                    style: 'nested',
                    precision: 5
                },
                files: {
                    '<%= project.assets %>css/app.css': '<%= project.scss %>'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: '<%= project.assets %>{,**/}*.scss',
                tasks: ['sass:dev']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.registerTask('default', [
        'sass:dev',
        'watch'
    ]);
};
