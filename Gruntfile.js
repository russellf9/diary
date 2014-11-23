module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);


	// Configurable paths
	var config = {
		app: 'app',
		dist: 'dist'
	};



	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		config: config,

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js'
				//,
				//'<%= config.app %>/js/{,*/}*.js'
				//,
				//'!<%= config.app %>/scripts/vendor/*',
				//'test/spec/{,*/}*.js'
			]
		}

	});

	grunt.registerTask('jshint', function(){
		grunt.log.write('jshint some stuff... app: ').ok();

		grunt.log.write('config: ', config);


		var app  = grunt.config.get( 'config.app' );

		grunt.log.write('app: ', app);

		var hint  = grunt.config.get( 'jshint.options.jshintrc' );

	//	grunt.log.write('app:  ', app).ok();





	});

	// A very basic default task.
	grunt.registerTask('default', 'Log some stuff.', ['jshint']
	);

};