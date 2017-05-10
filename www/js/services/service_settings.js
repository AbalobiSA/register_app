angular.module('app.services').service('settings', ['$http', function($http) {

    var debug_mode = true;

    this.getDebugMode = function(){
        return debug_mode;
    }


}]);
