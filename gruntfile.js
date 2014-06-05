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
    watch: {
      css: {
        files: 'assets/sass/*.scss',
        tasks: ['sass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch']);
}
