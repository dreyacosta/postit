module.exports = function(grunt) {

    grunt.initConfig({

        jshint: {
            all: [
                'gruntfile.js',
                'routes/**',
                'public/javascripts/app/**',
                'public/javascripts/*.js'
            ]
        },

        uglify: {
            options: {
                compress: true,
                report: true
            },
            vendors: {
                files: {
                    'dist/public/javascripts/vendors/vendors.js': [
                        'public/javascripts/vendors/jquery.js',
                        'public/javascripts/vendors/underscore.js',
                        'public/javascripts/vendors/backbone.js',
                        'public/javascripts/vendors/backbone.marionette.js',
                        // 'public/javascripts/vendors/socket.io.js',
                        'public/javascripts/vendors/jquery.autosize.js',
                        'public/javascripts/vendors/jquery.timeago.js',
                        'public/javascripts/vendors/q.js'
                        // 'public/javascripts/vendors/html5editor.js'
                    ]
                }
            },
            admin: {
                files: {
                    'dist/public/javascripts/app/admin/admin.js': [
                        'public/javascripts/init.js',
                        'public/javascripts/app/admin/models/*.js',
                        'public/javascripts/app/admin/collections/*.js',
                        'public/javascripts/app/admin/routers/*.js',
                        'public/javascripts/app/admin/views/*.js',
                        'public/javascripts/app/admin/*.js'
                    ]
                }
            },
            client: {
                files: {
                    'dist/public/javascripts/app/client/client.js': [
                        'public/javascripts/init.js',
                        'public/javascripts/app/client/models/*.js',
                        'public/javascripts/app/client/collections/*.js',
                        'public/javascripts/app/client/routers/*.js',
                        'public/javascripts/app/client/views/*.js',
                        'public/javascripts/app/client/*.js'
                    ]
                }
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [
                    {expand: true, src: ['public/images/*'], dest: 'dist/'}
                ]
            }
        },

        copy: {
            target: {
                files: [
                    {
                        expand: true,
                        src: [
                            'routes/**',
                            'public/**',
                            '!public/images/**',
                            '!public/javascripts/**',
                            '!public/stylesheets/*.styl',
                            '*.json',
                            'postit.js',
                            'public/javascripts/vendors/socket.io.js',
                            'public/javascripts/vendors/html5editor.js',
                            'views/**'
                        ],
                        dest: 'dist/'
                    }
                ]
            }
        },

        watch: {
            files: ['routes/**', 'public/javascripts/*.js'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify', 'copy']);

};