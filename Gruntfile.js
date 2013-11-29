/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    dist: 'dist',
    filename: 'gebo-client-performatives',
    meta: {
        all: 'angular.module("gebo-client-performatives", [<%= srcModules %>]);'
    },
    // Task configuration
    concat: {
        dist: {
            options: {
                banner: '<%= meta.all %>\n'
            },
            src: [], //src filled in by build task
            dest: '<%= dist %>/<%= filename %>.js'
        },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        smarttabs: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    copy: {
      build: {
        cwd: 'src',
        src: ['directives/templates/*.html'],
        dest: 'dist',
        expand: true
      },
    },
    clean: {
      build: {
        src: ['dist']
      },
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: '*.js',
          dest: 'dist'
        }]
      }
    },
    html2js: {
        dist: {
            options: {
                base: 'src/directives',
                module: null,
            },
            files: [{
                expand: true,
                src: ['src/directives/templates/**/*.html'],
                ext: '.html.js'
            }],
        },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-html2js');

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma', 'build']);

  // Test
  grunt.registerTask('test', ['html2js', 'karma']);

  grunt.registerTask('build', 'Create bootstrap build files', function() {
    grunt.task.run(['clean']);

    function enquote(str) {
        return '"' + str + '"';
    }
              
    var srcModules = grunt.file.expand({ cwd: 'src' }, '*/*.js').map(
        function(file) {
            return enquote(grunt.config('filename') + '.' + file.split('/')[1].split('.')[0]);
          });
    grunt.config('srcModules', srcModules);

    var srcFiles = grunt.file.expand("src/**/*.js");

    //Set the concat task to concatenate the given src modules
    grunt.config('concat.dist.src', grunt.config('concat.dist.src')
        .concat(srcFiles));

    grunt.task.run(['concat', 'uglify']);
  });


};
