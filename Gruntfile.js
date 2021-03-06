module.exports = function(grunt) {
    
    var $ = require( "jquery" );
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
                    src: ['public/js/libs/require.js','<%=requirejs.mobileJS.options.mainConfigFile%>', 'public/img/*',
                    'public/font/SourceSansPro-Regular.otf',
                    'public/font/SourceSansPro-Light.otf',
                    'public/font/SourceSansPro-Semibold.otf',
                    '<%=requirejs.mobileJS.options.out%>', '<%=requirejs.mobileCSS.options.out%>'],
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
             mags: {
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: [
                        'mags/*/*/*/parsed.html',
                        'mags/*/*/*/assets/css/parsed.css',
                        'mags/*/*/*/assets/images/item*',
                        'mags/*/*/*/book/assets/images/*pagethumb*'    
                    ],
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
                },
                {
                    expand: true,
                    cwd: 'dist/res',
                    src: ['./**'],
                    dest: 'dist/tmp/res'
                },
                {
                    expand: true,
                    cwd: 'dist/hooks',
                    src: ['./**'],
                    dest: 'dist/tmp/hooks'
                }]
            }
        },
        responsive_images: {
            magThumbs: {
              options: {
                separator:'',  
                sizes:[{name:'', width: 102, height:77 }]
              },
              files: [{
                expand: true,
                src: ['public/mags/thumbs/*.png'],
                custom_dest: 'dist/tmp/mags/thumbs/{%= name %}'
                
              }]
            },
            iconsIOS: {
              options: {
                sizes: 
                [
                    {name: '',width: 57},
                    {name: "@2x",width: 114/*suffix: "_x2",*//*quality: 0.6*/},
                    {name: '60',width: 60},
                    {name: '60@2x',width: 120},
                    {name: '72',width: 72},
                    {name: '72@2x',width: 144},
                    {name: '76',width: 76},
                    {name: '76@2x',width: 152}
                ]
              },
              files: [{
                expand: true,
                src: ['dist/res/1/ios/icons/icon.png']
              }]
            },

            splashIOS: {
              options: {
                sizes: 
                [
                    {name: '568h@2x~iphone',width: 640,height:1136},
                    {name: 'Landscape@2x~ipad',width: 2048 ,height:1496},
                    {name: 'Landscape~ipad',width: 1024,height:748},
                    {name: 'Landscape~ipad1',width: 1024,height:768},
                    {name: 'Portrait@2x~ipad',width: 1536,height:2008},
                    {name: 'Portrait~ipad',width: 768 ,height:1004},
                    {name: '@2x~iphone',width: 640,height:960},
                    {name: '~iphone',width: 320,height:480}
                ]
              },
              files: [{expand: true,src: ['dist/res/1/ios/splash/Default.png']}]
            },
            //http://docs.phonegap.com/en/3.0.0/cordova_splashscreen_splashscreen.md.html
            iconsAndroid: {
              options: {  
                sizes: 
                [
                    {name: 'drawable',width: 48,height:48},
                    {name: 'drawable-ldpi',width: 36,height:36},
                    {name: 'drawable-mdpi',width: 48,height:48},
                    {name: 'drawable-hdpi',width: 72,height:72},
                    {name: 'drawable-xhdpi',width: 96,height:96}
                ]
              },
              files: [{
                  expand: true,
                  src: ['dist/res/1/ios/icons/icon.png'],
                  custom_dest: 'dist/res/1/android/{%= name %}/'
              }]
            },
            splashAndroid: {
              options: {
                sizes: 
                [
                    {name: 'drawable',width: 960,height:720},
                    {name: 'drawable-ldpi',width: 426,height:320},
                    {name: 'drawable-mdpi',width: 470,height:320},
                    {name: 'drawable-hdpi',width: 640,height:480},
                    {name: 'drawable-xhdpi',width: 960,height:720}
                ]
              },
              files: [{
                  expand: true,
                  src: ['dist/res/1/android/drawable/splash.png'],
                  custom_dest: 'dist/res/1/android/{%= name %}/'
              }]
            }
        },
        imagemin:{                          // Task
            mags: {
              options: {
                pngquant:true,
                optimizationLevel: 4
              },                             // Another target
              files: [{
                expand: true,                // Enable dynamic expansion
                cwd: 'dist/tmp/mags/1',      // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}']  // Actual patterns to match
                //dest: 'dist/'              // Destination path prefix
              }]
            }
        },
        "imagemagick-convert":{
          mags:{
              files: [{
                expand: true,                // Enable dynamic expansion
                cwd: 'dist/tmp/mags/1',      // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}']  // Actual patterns to match
                
              }],
            args:['-format jpg'],
            fatals: true
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
    /*grunt.loadNpmTasks('grunt-image-resize');*/
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-imagemagick');
    /*grunt.loadNpmTasks('grunt-multiresize');*/
    
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['requirejs:desktopJS', 'requirejs:mobileJS', 'requirejs:desktopCSS', 'requirejs:mobileCSS']);
    grunt.registerTask('mobile-prod', ['test','requirejs:mobileJS', 'requirejs:mobileCSS', 'clean:phonegap','copy:phonegap', 'copy:root','mags','imagemin:mags','preprocess:phonegap', 'clean:rmpublic']);
    grunt.registerTask('mobile', ['test','requirejs:mobileDevJS', 'requirejs:mobileCSS', 'clean:phonegap','responsive_images','copy:phonegap', 'copy:root','preprocess:phonegap', 'clean:rmpublic', 'git_deploy:phonegap']);
    grunt.registerTask('mobile-nopush', ['test','requirejs:mobileDevJS', 'requirejs:mobileCSS', 'clean:phonegap','copy:phonegap', 'copy:root','mags','preprocess:phonegap', 'clean:rmpublic']);
    grunt.registerTask('mags', ['parseMag','copy:mags','responsive_images:magThumbs']); //'git_deploy:phonegap'
    
    grunt.registerTask('default', ['test', 'build']);
    grunt.registerTask('template', ['template']);
    
    grunt.registerTask('images', ['responsive_images']);
    
    grunt.registerTask('parseMag', function(){
        grunt.file.defaultEncoding = 'utf8';
        
        console.log('---- Html Parse ----');
        
        grunt.file.recurse('public/mags/1', function(abspath, rootdir, subdir, filename){
      
            if(filename != 'index.html' || abspath.search('book') !== -1  )return;
     
            var magPath = 'mags/1/' + subdir;

            var content = grunt.file.read(abspath);
            
            var $parsed = $(content);
           
            $parsed.find('img').each(function(index,el){
                $(this).attr('src', magPath + '/' + $(this).attr('src') );
            });
   
            $parsed.find('video').each(function(index,el){
                var $source = $('source',this);
                $(this).attr('poster', magPath + '/' + $(this).attr('poster'));
                $(this).attr('preload', 'none');
                $(this).attr('webkit-playsinline', 'webkit-playsinline');
                $(this).removeAttr('controls');              
                $(this).parent().append('<div class="topcoat-spinner video-spinner"></div>');              
                $('object',this).remove();              
                $(this).parent().appendTo( $(this).parents('li.page') );
                $(this).parent().before('<div class="video-mask"></div>');
            });
            
            $parsed.find('.mso.slideshow').each(function(index,el){
                $(this).attr('data-useswipe',0);
            });
            
            $parsed.find('source').each(function(index,el){
                $(this).attr('src',$(this).attr('src') );
            });
            
            $parsed.filter('script').each(function(index,el){
                $(this).removeAttr('src');
            });
            
            $parsed.find('.page').each(function(index,el){
               $(this).addClass('slide');
            });

            filepath = rootdir + '/' + subdir + '/parsed.html' ;
            
            console.log(filepath);
            
            grunt.file.write(filepath, $parsed.find('.pages').html() );
        });
  
        console.log('---- Css Parse ----');
        
        grunt.file.recurse('public/mags/1', function(abspath, rootdir, subdir, filename){
      
            if(filename != 'pages.css' || abspath.search('book') !== -1  )return;
            
            var filepath = rootdir + '/' + subdir + '/parsed.css' ;
            
            console.log(filepath);
      
            var magPath = 'mags/1/' + subdir;
            
            var css = grunt.file.read(abspath).split('/*CSS Generated from InDesign Styles*/')[1] ;
            var parsedCss = css.replace(/images/gi,  'mags/1/' + subdir.split('css')[0] + 'images' ) ;
            
            grunt.file.write(filepath, parsedCss );
        });
    });
};

/*
add id_rsa
add id_rsa.pub
brew install graphicsmagick

plugman install --platform ios --project ./platforms/ios  --plugin org.apache.cordova.file
plugman install --platform ios --project ./platforms/ios  --plugin org.apache.cordova.file-transfer
plugman install --platform ios --project ./platforms/ios  --plugin org.apache.cordova.network-information


/platforms/ios/Geometrixx/Resources/icons folder and 
splash screens into the …/platforms/ios/Geometrixx/Resources/splash folder.

sudo npm install -g grunt-cli

Android Sign apk:
http://ionicframework.com/docs/guide/publishing.html

*/