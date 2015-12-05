module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        options: {
          banner: '/**\ntimber v<%= pkg.version %>\n(c) 2014-2016 Nick Comer http://nick.comer.io\nLicense: MIT\n*/\n',
          sourceMap: true
        },
        src: 'src/ng-timber.js',
        dest: 'dist/ng-timber.min.js'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')

  grunt.registerTask('default', ['uglify:dist'])
}
