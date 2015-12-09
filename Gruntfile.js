module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dashboards: {
                src: ['src/pre.js',
                    'src/post.js'],
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        jshint: {
            scripts: {
                src: 'build/<%= pkg.name %>.js'
                // src: ['src/**/*.js']
            },

            tests: { // jshint task, calls 'jshint:tests'
                src: 'test/**/*.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jasmine: {
            taskName: {
                // src: 'src/**/*.js',
                src: 'build/<%= pkg.name %>.js',
                options: {
                    specs: 'test/unit/test-*.js',
                    helpers: 'test/*Helper.js',
                    //host: 'http://127.0.0.1:8000/',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            // baseUrl: 'src/'
                            baseUrl: 'build/',
                            paths: {
                                // 'jquery': 'lib/jquery-1.11.3.min',
                                //'du-stomp': 'du-stomp.js'
                            }
                        }
                    }
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'test/**/*.js', 'Gruntfile.js'],
                // files: ['**/*.js'],
                tasks: ['concat', 'jshint', 'jasmine'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Aliases
    grunt.registerTask('default', ['concat', 'jshint', 'jasmine']);
    grunt.registerTask('build', ['concat', 'jshint', 'jasmine', 'uglify']);
    // grunt.registerTask('test', ['jasmine']);

};