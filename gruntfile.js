module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['gruntfile.js', 'routes/*.js', 'routes/admin/*.js', 'public/javascripts/*.js']
        },

        uglify: {
            compress: {
                files: [
                    {expand: true, src: ['postit.js', 'routes/*.js', 'routes/*/*.js', 'public/javascripts/*.js', 'public/javascripts/*/*.js'], dest: 'www/'}
                ]
            }
        },

        imagemin: {                          
            dist: {                            
                options: {                       
                    optimizationLevel: 3
                },
                files: [
                    {expand: true, src: ['public/images/*'], dest: 'www/'}
                ]
            }
        },

        copy: {
            target: {
                files: [
                    {
                        expand: true,
                        src: [
                            '*.json',
                            '!gruntfile.js',
                            'public/**',
                            '!public/images/**',
                            '!public/javascripts/**',
                            '!public/stylesheets/*.styl',
                            'views/**'
                        ],
                        dest: 'www/'
                    }
                ]
            }
        },

        watch: {
            files: ['routes/**', 'public/javascripts/*.js'],
            tasks: ['jshint']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify', 'imagemin', 'copy']);

};