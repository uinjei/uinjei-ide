'use strict';
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-nw-builder');

  grunt.initConfig({

  copy: {
      nwjs: {
          files: [
              {
                  cwd: 'dist',
                  src: [
                      '**/*.*',
                  ],
                  dest: 'nwjs/',
                  expand: true
              }
          ]
      }

  },

  exec: {
    angular_build: {
        command: "ng build",
        stdout: true,
        stderr: true
    },

    nw_build: { //temporary, use grunt-nwjs instead
        command: "nwbuild -p linux64 ./nwjs -o ./webkitbuilds -v 0.26.4 --flavor sdk",
        stdout: true,
        stderr: true
    }
  },

  nwjs: {
    options: {
        platforms: ['linux64'],
        version: '0.26.5',
        flavor: 'normal',
        cacheDir: './nwjs/cache',
        downloadUrl: 'https://dl.nwjs.io/',
        buildDir: './webkitbuilds',
    },
    src: ['./nwjs/**/*']
  }

  });

  grunt.registerTask('build', ['exec:angular_build', 'copy:nwjs','nwjs']);
  grunt.registerTask('build_nw_build', ['exec:angular_build', 'copy:nwjs','exec:nw_build']);

};
