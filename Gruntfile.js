module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    curr_year: (new Date()).getUTCFullYear(),
    uglify: {
      dist: {
        options: {
          banner: [
            '/**',
            ' * ng-timber v<%= pkg.version %>',
            ' * (c) 2014 - <%= curr_year %> nick comer (@nkcmr)',
            ' * license: mit',
            ' */'
          ].join('\n'),
          sourceMap: true
        },
        src: 'dist/ng-timber.js',
        dest: 'dist/ng-timber.min.js'
      }
    },
    browserify: {
      dist: {
        options: {
          ignore: ['angular']
        },
        files: {
          'dist/ng-timber.js': ['src/ng-timber.js']
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-browserify')

  grunt.registerTask('default', ['browserify:dist', 'uglify:dist'])
}
