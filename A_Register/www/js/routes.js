angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homectrl'
  })

  .state('personal_details', {
    url: '/personal_details',
    templateUrl: 'templates/personal_details.html',
    controller: 'register2Ctrl'
  })

  .state('fisher_info', {
    url: '/fisher_info',
    templateUrl: 'templates/fisher_info.html',
    controller: 'register2Ctrl'
  })

  .state('terms', {
    url: '/terms',
    templateUrl: 'templates/terms.html',
    controller: 'register2Ctrl'
  })

  .state('monitor_fmanager_CoOp', {
    url: '/monitor_fmanager_CoOp',
    templateUrl: 'templates/monitor_fmanager_CoOp.html',
    controller: 'register2Ctrl'
  })



$urlRouterProvider.otherwise('/home')



});
