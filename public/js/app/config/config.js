require.config({
    baseUrl: "js/libs",

    paths: {

        //marionette application
        "App": "../app/App",
        "routers": "../app/routers",
        "controllers": "../app/controllers",
        "collections": "../app/collections",
        "models": "../app/models",
        "views": "../app/views",
        "templates": "../app/templates",

        // libraries
        "jquery": "jquery",
        "underscore": "lodash",
        "backbone": "backbone", //the AMD compatible fork
        "backbone.validation": "backbone.validation",
        "json2": "json2",
        "marionette": "backbone.marionette",
        "bootstrap":"bootstrap",

        "handlebars": "handlebars",
        "hbs": "hbs",
        "i18nprecompile": "i18nprecompile",

        "jasmine": "jasmine",
        "jasmine-html": "jasmine-html",
        "jasminejquery": "jasmine-jquery",

        "text": "require.text"
    },
    // Configuration for your third party scripts that are not AMD compatible
    shim: {

        //UI libraries
        "bootstrap": ["jquery"],
        "handlebars": {
            "exports": "Handlebars"
        },

        "jasmine": {
            // Exports the global 'window.jasmine' object
            "exports": "jasmine"
        },

        "jasmine-html": {
            "deps": ["jasmine"],
            "exports": "jasmine"
        }
    },
    // hbs config - must duplicate in Gruntfile.js Require build
    hbs: {
        templateExtension: "html",
        helperDirectory: "templates/helpers/",
        i18nDirectory: "templates/i18n/",

        compileOptions: {} // options object which is passed to Handlebars compiler
    }
});