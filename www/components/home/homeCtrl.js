angular.module('app.controllers').controller('homectrl', function(
    $scope, $localStorage, $location, strings, matrix, $ionicHistory, userinfo, nodeServer) {

/*============================================================================
     Initialization
 ============================================================================*/
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        cordova.getAppVersion(function(version) {
            // alert(version);
            $scope.appVersion = version;
            $scope.user.app_version = version;
            userinfo.updateInfo($scope.user);
        })
    }

    $scope.$on('$ionicView.enter', function() {

        try{
            cordova.getAppVersion(function(version) {
                $scope.appVersion = version;
                $scope.user.app_version = version;
                userinfo.updateInfo($scope.user);
            })
        } catch(ex){
            //This will happen when run on a browser
            $scope.appVersion = "browser";
            $scope.user.app_version =  "browser";
        }

    });
    //loads info from localStorage if user saved info offline
    $scope.user = {};
    userinfo.updateInfo($localStorage.user);

/*============================================================================
    Buttons
 ============================================================================*/

    //clear function clears all information including localStorage
    $scope.button_clear = function() {

        $localStorage.$reset();
        userinfo.clearInfo();
        $ionicHistory.clearCache();
        alert(strings.get_translation(strings.HOME_CLEAR));

        try{
            cordova.getAppVersion(function(version) {
                $scope.appVersion = version;
                $scope.user.app_version = version;
                userinfo.updateInfo($scope.user);
            })
        } catch(ex){
            // console.log("MAJOR ERROR: " + ex);
        }
    };

    $scope.button_check_for_updates = function(){
        // $scope.appVersion = version;
        nodeServer.checkVersion("/version_registerapp", $scope.appVersion, successCB, errorCB);

        function successCB(response){
            // console.log("RESPONSE: " + JSON.stringify(response, null, 4));
            if (response.updateAvailable === true){
                alert("There is an update available on the play store!");
                window.open('https://play.google.com/store/apps/details?id=com.abalobi.register', '_system')
            } else{
                alert("You currently have the latest version of the app.");
            }
        }

        function errorCB(response){
            alert("Unable to check for updates.\n" +
                "Please check your network settings.");
        }

    };

    $scope.button_register = function() {
        var networkState = navigator.connection.type;

        if (networkState === "none") {
            alert(strings.get_translation(strings.HOME_NO_CONNECTION))
        }
    }

/*============================================================================
    Other Functions
 ============================================================================*/

}); //end home controller
