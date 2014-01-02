module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			css: {
				src: "src/<%= pkg.name %>.css",
				dest: "dist/<%= pkg.name %>.css",
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/<%= pkg.name %>.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["src/<%= pkg.name %>.js"],
				dest: "dist/<%= pkg.name %>.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// qUnit test suite
		qunit: {
	    	files: ['test/**/*.html']
	    },

	    watch: {
	        files: ['src/<%= pkg.name %>.js'],
	        tasks: ['default'],
      	}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", ["concat", "jshint", "uglify", "qunit"]);
	grunt.registerTask("travis", ["jshint", "qunit"]);

};
