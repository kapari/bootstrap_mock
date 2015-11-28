module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Package
        pkg: grunt.file.readJSON('package.json'),

        // Uglify
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                ' * @author <%= pkg.author %> */\n'
            },
            build: {
                src: 'js/main.js',
                dest: 'deploy/js/main.min.js'
            }
        },
        // Sass
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    // banner: '<%= tag.banner %>',
                    // compass: true
                },
                files: {
                    'css/style.css': 'scss/style.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    // compass: true
                },
                files: {
                    'deploy/css/style.css': 'scss/style.scss'
                }
            }
        },
        // Watch
        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: 'scss/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            }
        },
        imagemin: {
           dist: {
              options: {
                optimizationLevel: 3 // 0-7; default 3
              },
              files: [{
                 expand: true,
                 cwd: 'img/', // Src matches are relative to this path
                 src: ['static/**/*.{png,jpg,gif}'], // Patterns to match
                 dest: 'deploy/img'
              }]
           }
        }
    });

    // Load Plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task
    grunt.registerTask('default', [
        'sass:dev',
        'watch'
    ]);
    // Deploy task
    grunt.registerTask('deploy', [
        'sass:dist',
        'uglify:build'
    ]);

};
