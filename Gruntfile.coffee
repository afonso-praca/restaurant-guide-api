module.exports = (grunt) ->

	pkg = grunt.file.readJSON('package.json')

	# Project Configuration
	grunt.initConfig
		nodemon:
			main:
				options:
					file: 'app.js'
					ignoredFiles: ['node_modules/**', '.idea/**', '.git/**']
					watchedFolders: ['restaurant']
					debug: true
					delayTime: 1

		concurrent:
			main:
				tasks: ['nodemon']
				options:
					logConcurrentOutput: true
					limit: 2

		release:
			options:
				npm: false

	#Load NPM tasks
	grunt.loadNpmTasks name for name of pkg.devDependencies when name[0..5] is 'grunt-'

	grunt.registerTask "default", ["concurrent"]