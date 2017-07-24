angular.module('app.services').service('settings', ['$http', function($http) {

    var debug_mode = false;

    this.getDebugMode = function(){
        return debug_mode;
    }


}]);
