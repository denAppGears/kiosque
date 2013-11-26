module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        recess: {
          options: {
            compile: true
          },
          bootstrap: {
            src: ['public/css/less/bootstrap/bootstrap.less'],
            dest: 'public/css/bootstrap.css'
          },
          theme: {
            src: ['public/css/less/bootstrap/theme.less'],
            dest: 'public/css/bootstrap-theme.css'
          },
          afui :{
            src: ['public/css/less/afui/afui.less','public/css/less/afui/theme-yp.less'],//,'public/css/less/afui/src/yp.css','public/css/less/afui/src/plugins/*'
            dest: 'public/css/af.ui.css'
          },
        afui_newless:{
            src: [ 
                "public/css/less/afui/src/main.css",
                "public/css/less/afui/src/appframework.css",
                "public/css/less/afui/src/lists.css",
                "public/css/less/afui/src/forms.css",
                "public/css/less/afui/src/buttons.css",
                "public/css/less/afui/src/badges.css",
                "public/css/less/afui/src/grid.css",
                
                "public/css/less/afui/src/importer.css",
                
                "public/css/less/afui/src/plugins/af.actionsheet.css",
                "public/css/less/afui/src/plugins/af.popup.css",
                "public/css/less/afui/src/plugins/af.scroller.css",
                "public/css/less/afui/src/plugins/af.selectbox.css"
                 ],
            dest: 'public/css/af.ui.less.new'
        }
           
        },

        requirejs: {
            mobileJS: {
                options: {
                    baseUrl: "public/js/libs",
                    wrap: true,
                    // Don't use almond if your project needs to load modules dynamically
                    name: "almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    optimizeCss: "standard",
                    mainConfigFile: "public/js/app/config/config.js",
                    include: ["../app/init/MobileInit"],
                    out: "public/js/app/init/MobileInit.min.js",

                    /**
                     * https://github.com/SlexAxton/require-handlebars-plugin
                     */
                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser: true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true
                    },

                    locale: "en_us",

                    // options object which is passed to Handlebars compiler
                    hbs: {
                        templateExtension: "html",
                        helperDirectory: "templates/helpers/",
                        i18nDirectory: "templates/i18n/",
                        compileOptions: {}
                    }
                }
            },
            mobileDevJS: {
                options: {
                    baseUrl: "public/js/libs",
                    wrap: false,
                    // Don't use almond if your project needs to load modules dynamically
                    name: "almond",
                    preserveLicenseComments: true,
                    optimize: "",
                    optimizeCss: "standard",
                    mainConfigFile: "public/js/app/config/config.js",
                    include: ["../app/init/MobileInit"],
                    out: "public/js/app/init/MobileInit.min.js",

                    /**
                     * https://github.com/SlexAxton/require-handlebars-plugin
                     */
                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser: true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true
                    },

                    locale: "en_us",

                    // options object which is passed to Handlebars compiler
                    hbs: {
                        templateExtension: "html",
                        helperDirectory: "templates/helpers/",
                        i18nDirectory: "templates/i18n/",

                        compileOptions: {}
                    }
                }
            
            },
            mobileCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./public/css/mobile.css",
                    out: "./public/css/mobile.min.css"
                }
            },
            desktopJS: {
                options: {
                    baseUrl: "public/js/libs/",
                    wrap: true,
                    // Cannot use almond since it does not currently appear to support requireJS's config-map
                    name: "almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    mainConfigFile: "public/js/app/config/config.js",
                    include: ["../app/init/DesktopInit"],
                    out: "public/js/app/init/DesktopInit.min.js"
                }
            },
            desktopCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./public/css/desktop.css",
                    out: "./public/css/desktop.min.css"
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },
        clean: {
            phonegap: {
                src: "<%=copy.phonegap.files[0].dest%>"
            },
            rmpublic: {
                src: "dist/tmp/public"
            }
        },
        preprocess: {
            'phonegap': {
                'options': {
                    'context': {
                        'PRODUCTION': true,
                        'PHONEGAP': true
                    }
                },
                'files': {
                    'dist/tmp/index.html': ['dist/index.html']
                }
            },
            'dev' : {
                'options': {
                    'context': {
                        'PRODUCTION': false,
                        'PHONEGAP': false
                    }
                },
                'files': {
                    'public/index.html': ['dist/index.html']
                }
            }
            
        },
        copy: {
            phonegap: {
                files: [{
                    expand: true,
                    src: ['public/js/libs/require.js','<%=requirejs.mobileJS.options.mainConfigFile%>', 'public/img/*','public/fonts/*','public/mags/**', '<%=requirejs.mobileJS.options.out%>', '<%=requirejs.mobileCSS.options.out%>'],
                    dest: 'dist/tmp',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: ['dist/config.xml'],
                    dest: 'dist/tmp',
                    filter: 'isFile'
                }]

            },
            root: {
                files: [{
                    expand: true,
                    cwd: 'dist/tmp/public',
                    src: ['./**'],
                    dest: 'dist/tmp'
                },{
                    expand: true,
                    cwd: 'dist/res',
                    src: ['./**'],
                    dest: 'dist/tmp/res'
                }]
            }
        },
        git_deploy: {
            phonegap: {
                options: {
                    url: 'git@github.com:denAppGears/kiosque-phonegap.git',
                    branch: 'master'
                },
                src: 'dist/tmp'
            }
        },
        "phonegap-build" : {
            fromgit:{
              options: {
                //archive: "app.zip",
                "isRepository" : "true",
                "appId": "558893",
                "user": {
                    //"token" : "f0fcc519fad9122ec3144a0737f83ce08b74cd29" //github token
                    "email": "schmitzdenis@gmail.com",
                    "password": "Densch000"
                }
              }
          
          }
        },
        watch: {
          bootstrap: {
            files: 'public/css/less/bootstrap/*.less',
            tasks: ['recess']
          },
         afui :{
            files:'public/css/less/afui/theme-yp.less',
            tasks:['recess:afui']
            }
        }

    });
    
    grunt.loadNpmTasks('jquery');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-git-deploy');
    grunt.loadNpmTasks('grunt-contrib-clean');
   // grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['requirejs:desktopJS', 'requirejs:mobileJS', 'requirejs:desktopCSS', 'requirejs:mobileCSS']);
    grunt.registerTask('mobile-prod', ['test', 'recess','requirejs:mobileJS', 'requirejs:mobileCSS', 'clean:phonegap','copy:phonegap', 'copy:root','preprocess:phonegap', 'clean:rmpublic', 'git_deploy:phonegap']);
    grunt.registerTask('mobile', ['test','recess:afui','requirejs:mobileDevJS', 'requirejs:mobileCSS', 'clean:phonegap','copy:phonegap', 'copy:root','preprocess:phonegap', 'clean:rmpublic', 'git_deploy:phonegap']); //,'phonegap-build:fromgit' //, 
    grunt.registerTask('default', ['test', 'build']);
    grunt.registerTask('template', ['template']);
    
    grunt.registerTask('parseMag', function(){
        grunt.file.defaultEncoding = 'utf8';
        var contents = grunt.file.read('public/mags/1/3/pages.html');
        jQuery(contents).find('img');
        console.log(contents);
        grunt.file.write(filepath, contents);
    });
};

/*
add id_rsa
add id_rsa.pub
plugman install --platform ios --project ./platforms/ios  --plugin org.apache.cordova.file
plugman install --platform ios --project ./platforms/ios  --plugin org.apache.cordova.file-transfer
plugman install --platform ios --project ./platforms/ios  --plugin org.apache.cordova.network-information
*/