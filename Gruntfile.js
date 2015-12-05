module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      dist: {
        src: 'src/ng-timber.js',
        dest: 'dist/ng-timber.min.js'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')

  grunt.registerTask('default', ['uglify'])
}
