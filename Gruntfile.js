module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        coffee: {
            compile: {
                files: {
                    'dist/sliderbarr.js': 'src/coffee/sliderbarr.coffee',
                    'test/spec/sliderbarr.spec.coffee.js': 'test/spec/sliderbarr.spec.coffee'
                }
            }
        },
        compass: {
            dist: {
                options: {
                    config: 'src/config.rb',
                    cssDir: 'dist/css',
                    sassDir: 'src/sass'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/sliderbarr.min.js': 'dist/sliderbarr.js'
                }
            }
        },
        jasmine : {
            slidertest: {
                src: ['dist/sliderbarr.min.js'],
                options: {
                    specs: 'test/spec/*.js',
                    template: 'test/SpecRunner.html'
                }
            }
        },
        watch: {
            coffee: {
                files : ['src/coffee/*.coffee', 'test/spec/*.coffee'],
                tasks: 'coffee'
            },
            compass: {
                files: 'src/sass/*.scss',
                tasks: 'compass'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // Default task.
    grunt.registerTask('default', ['coffee', 'compass', 'uglify']);

};