// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'pascalprecht.translate', 'ngStorage',  'app.controllers', 'app.routes', 'app.services', 'app.directives'])



.run(function($ionicPlatform,PopupTranslate, userinfo) {
  $ionicPlatform.ready(function() {

      //prompts user for language
      var myPopup = PopupTranslate.getPopup();

      //loads device info on start up
      var dev_info = {}

      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
          console.log(device.cordova);
      }
      dev_info.device_manufacturer = device.manufacturer;
      dev_info.device_model = device.model;
      dev_info.device_platform = device.platform;
      dev_info.device_version = device.version;
      dev_info.device_uuid = device.uuid;
      dev_info.device_serial = device.serial;

      userinfo.updateInfo(dev_info)


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
