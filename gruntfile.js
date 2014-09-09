module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'assets/sass/',
          src: ['stylesheet.scss'],
          dest: 'assets/',
          ext: '.css'
        }]
      }
    },
    jshint: {
      all: {
        src: ['assets/javascript/**/*.js']
      },
    },
    uglify: {
      options: {
        compress: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/javascript/',
          src: '**/*.js',
          dest: 'assets/uglify-cache/'
        }]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['assets/uglify-cache/utils.js', 'assets/uglify-cache/**/*.js'],
        dest: 'assets/scripts.js'
      }
    },
    watch: {
      css: {
        files: 'assets/sass/stylesheet.scss',
        tasks: ['sass']
      },
      scripts: {
        files: 'assets/javascript/**/*.js',
        tasks: ['jshint', 'uglify', 'concat'],
        options: {
          spawn: false
        }
      },
      concat: {
        files: 'assets/uglify-cache/**/*.js',
        tasks: ['concat']
      }
    }
  });

// on watch events configure jshint:all to only run on changed file
 grunt.event.on('watch', function(action, filepath) {
   grunt.config('jshint.all.src', filepath);
 });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default',['watch']);
  grunt.registerTask('build',['sass', 'uglify', 'concat']);
}
