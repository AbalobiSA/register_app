// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'pascalprecht.translate', 'ngStorage', 'app.matrix',  'app.controllers', 'app.routes', 'app.strings', 'app.services', 'app.directives'])



.run(function($ionicPlatform, PopupTranslate, language, $translate, $localStorage, $location, userinfo, strings ) {
    $ionicPlatform.ready(function() {


        //check for localStorage. If present load language of choice and prompt for skip to register

        if ($localStorage.user != null)
        {
            $translate.use($localStorage.language)
            language.updateInfo($localStorage.language)
             alert(strings.get_translation(strings.START_STORAGE))

        }
        else{
            //prompts user for language
            var myPopup = PopupTranslate.getPopup()
        }


        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
