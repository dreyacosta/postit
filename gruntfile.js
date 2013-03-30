module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: ['Gruntfile.js', 'routes/*.js', 'routes/admin/*.js', 'public/javascripts/*.js']
		},

		uglify: {
			compress: {
				files: {
					'deploy/public/javascripts/admin.js': ['public/javascripts/admin.js'],
					'deploy/public/javascripts/client.js': ['public/javascripts/client.js'],
					'deploy/public/javascripts/libs/jquery.autosize.js': ['public/javascripts/libs/jquery.autosize.js']
				}
			}
		},

		copy: {
			target: {
				// options: { cwd: 'path/to/sources' },
				files: { 'deploy/': ['public/font/*', 'public/images/**', 'public/stylesheets/**', 'routes/**', 'views/**', 'app.js', 'package.json'] }
			}
		},

		watch: {
			files: ['routes/**', 'public/javascripts/*.js'],
			tasks: ['jshint']
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify', 'copy']);

};