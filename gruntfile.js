module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/sass/',
          src: ['*.scss'],
          dest: 'assets/stylesheets/',
          ext: '.css'
        }]
      }
    },
    jshint: {
      all: {
        src: ['assets/javascript/*.js']
      },
    },
    watch: {
      css: {
        files: 'assets/sass/*.scss',
        tasks: ['sass']
      },
      scripts: {
        files: 'assets/javascript/*.js',
        tasks: ['jshint'],
        options: {
          spawn: false
        }
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
  grunt.registerTask('default',['watch']);
}
