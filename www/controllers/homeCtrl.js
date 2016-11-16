angular.module('app.controllers').controller('homectrl', function($scope, $localStorage, $location, strings, matrix, $ionicHistory, userinfo) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      cordova.getAppVersion(function(version) {
        $scope.appVersion = version;
      })
    }

    //loads info from localStorage if user saved info offline
    $scope.user = {}
    userinfo.updateInfo($localStorage.user)

    //clear function clears all information including localStorage
    $scope.clear = function() {
      $localStorage.$reset();
      userinfo.clearInfo();
      $ionicHistory.clearCache();
      alert(strings.get_translation(strings.HOME_CLEAR))
    }

    //evaluates the current netowrk connection and warns user if offline
    $scope.network = function() {
      var networkState = navigator.connection.type;

      if (networkState == "none") {
        alert(strings.get_translation(strings.HOME_NO_CONNECTION))
      }
    }
  }); //end home controller