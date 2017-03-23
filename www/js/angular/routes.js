angular.module('app.routes', [])

.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider, $translateProvider) {

    $ionicConfigProvider.scrolling.jsScrolling(false);

    $translateProvider.useStaticFilesLoader({
        prefix: 'data/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage("en");
    $translateProvider.useSanitizeValueStrategy('sanitize');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider



    .state('home', {
        url: '/home',
        templateUrl: 'components/home/home.html',
        controller: 'homectrl'
    })

    .state('personal_details', {
        url: '/personal_details',
        templateUrl: 'components/personal_details/personal_details.html',
        controller: 'personal_detailsCtrl'
    })

    .state('personal_details_coop', {
        url: '/personal_details_coop',
        templateUrl: 'components/personal_details_coop/personal_details_coop.html',
        controller: 'personal_detailsCtrl_coop'
    })

    .state('fisher_info', {
        url: '/fisher_info',
        templateUrl: 'components/fisher_info/fisher_info.html',
        controller: 'fisher_infoCtrl'
    })

    .state('terms', {
        url: '/terms',
        templateUrl: 'components/terms/terms.html',
        controller: 'termsCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'components/register/register.html',
        controller: 'registerCtrl'
    })

    .state('register_coop_summary', {
        url: '/register_coop_summary',
        templateUrl: 'components/register_coop_summary/register_coop_summary.html',
        controller: 'registerCtrl'
    })

    .state('monitor_fmanager_CoOp', {
        url: '/monitor_fmanager_CoOp',
        templateUrl: 'components/monitor_fmanager_coop/monitor_fmanager_CoOp.html',
        controller: 'termsCtrl'
    })

    .state('photo', {
        url: '/photo',
        templateUrl: 'components/photo/photo.html',
        controller: 'photoCtrl'
    })

    .state('camera_popup', {
        url: '/camera_popup',
        templateUrl: 'components/camera_popup/camera_popup.html',
        controller: 'photoCtrl'
    })



    $urlRouterProvider.otherwise('/home')



});
