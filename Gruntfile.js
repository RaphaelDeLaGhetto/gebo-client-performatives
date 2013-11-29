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
        modules: 'angular.module("gebo-client-performatives", ["gebo-client-performatives.tpls"]);',
        tplmodules: 'angular.module("gebo-client-performatives.tpls", [<%= tplModules %>]);',
        all: 'angular.module("gebo-client-performatives", ["gebo-client-performatives.tpls", <%= srcModules %>]);'
    },

    // Task configuration.
//    concat: {
//      options: {
//        banner: '<%= banner %>',
//        stripBanners: true
//      },
//      dist: {
//        src: ['src/services/request.js', 'src/directives/*.js'],
//        dest: 'dist/<%= pkg.name %>.js'
//      }
//    },
//
    concat: {
        dist: {
            options: {
                banner: '<%= meta.modules %>\n'
            },
            src: [], //src filled in by build task
            dest: '<%= dist %>/<%= filename %>.js'
        },
        dist_tpls: {
            options: {
                banner: '<%= meta.all %>\n<%= meta.tplmodules %>\n'
            },
            src: [], //src filled in by build task
            dest: '<%= dist %>/<%= filename %>-tpls.js'
        }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      dist_tpls:{
        src:['<%= dist %>/<%= filename %>-tpls.js'],
        dest:'<%= dist %>/<%= filename %>-tpls.min.js'
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

//  grunt.registerTask('build', [
//    'clean',
//    'copy',
//    'concat',
//    'ngmin',
//    'uglify',
//  ]);

  grunt.registerTask('build', 'Create bootstrap build files', function() {
    grunt.task.run(['clean']);

    function enquote(str) {
        return '"' + str + '"';
    }
              
    var tplModules = grunt.file.expand({ cwd: 'src/directives' }, "templates/*.html").
            map(enquote).filter(function(tpls) { return tpls.length > 0;});
    grunt.config('tplModules', tplModules);

    var srcFiles = grunt.file.expand("src/**/*.js");
    var tpljsFiles = grunt.file.expand("src/directives/templates/**/*.html.js"); 

    //Set the concat task to concatenate the given src modules
    grunt.config('concat.dist.src', grunt.config('concat.dist.src')
        .concat(srcFiles));

    //Set the concat-with-templates task to concat the given src & tpl modules
    grunt.config('concat.dist_tpls.src', grunt.config('concat.dist_tpls.src')
        .concat(srcFiles).concat(tpljsFiles));

    grunt.task.run(['concat', 'uglify']);
  });


};
