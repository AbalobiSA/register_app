angular.module('app.controllers').controller('homectrl', function(
    $scope, $localStorage, $location, strings, matrix, $ionicHistory, userinfo, nodeServer, fileOperations, language, $ionicLoading) {

/*============================================================================
     Initialization
 ============================================================================*/
    document.addEventListener("deviceready", onDeviceReady, false);

    $scope.ERRORS_HAVE_BEEN_SHOWN = false;

    function onDeviceReady() {
        cordova.getAppVersion(function(version) {
            // alert(version);
            $scope.appVersion = version;
            $scope.user.app_version = version;
            userinfo.updateInfo($scope.user);
        })
    }

    $scope.$on( "$ionicView.beforeEnter", function() {

        $scope.unsent_form_count = 0;

        fileOperations.getFileCount(function(number){
            $scope.unsent_form_count = number;
            $scope.$apply();
        });

    });

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


    $scope.$on('$ionicView.afterEnter', function() {
        $scope.$apply();
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
                alert(strings.get_translation(strings.UPDATE_AVAILABLE));
                window.open('https://play.google.com/store/apps/details?id=com.abalobi.register', '_system')
            } else{
                alert(strings.get_translation(strings.UPDATE_NOT_NECESSARY));
            }
        }

        function errorCB(response){
            alert(strings.get_translation(strings.UPDATE_CONNECTION_ERROR));
        }

    };

    $scope.button_register = function() {
        var networkState = navigator.connection.type;

        if (networkState === "none") {
            alert(strings.get_translation(strings.HOME_NO_CONNECTION))
        }
    };

    $scope.sendPipelineForms = function(){
        //TODO: Read in every form in the pipeline, and send one by one

        $scope.ERRORS_HAVE_BEEN_SHOWN = false;

        fileOperations.getPipelineForms(success, errorFileRead);

        //This will run once for each file in the system.
        function success(fileData, filePath, fileName){


            showLoadingScreen();

            //Upload the file
            upload(fileData, function(){


                //Uploaded, now archive
                // fileOperations.writeFileCustom(fileName, "abalobi/monitorsurvey/archive", fileData);

                //Delete from pipeline upon successful upload
                fileOperations.deleteFile(filePath + fileName, function(){
                    //Done!

                    //Reset the number of forms in the pipeline
                    fileOperations.getFileCount(function(number){
                        $scope.unsent_form_count = number;
                        $scope.$apply();
                    });

                    hideLoadingScreen();

                }, errorFileRead);
            }, errorPost);
        }

        function errorFileRead(){
            //Reset the number of forms in the pipeline
            fileOperations.getFileCount(function(number){
                $scope.unsent_form_count = number;
                $scope.$apply();
            });

            console.err("Unable to read the pipeline files!");
            hideLoadingScreen();
        }

        function errorPost(){
            //Reset the number of forms in the pipeline
            fileOperations.getFileCount(function(number){
                $scope.unsent_form_count = number;
                $scope.$apply();
            });

            if (!$scope.ERRORS_HAVE_BEEN_SHOWN){
                alert(strings.get_translation(strings.UPLOAD_CONNECTION_ERROR));
                $scope.ERRORS_HAVE_BEEN_SHOWN = true;
                hideLoadingScreen();
            }

            console.err("Unable to post to OpenFn!");
            hideLoadingScreen();
        }
    };

    function upload(input, success, error){

        if (error === undefined){
            error = function(){};
        }

        var SEND_TO_LOCALHOST = false;

        if (SEND_TO_LOCALHOST){
            // openFn.postLocally(input, prepareNewFormState, preserveData);
        } else{
            nodeServer.postRegistrationManually(input, success, error);
        }
    }

/*============================================================================
    Other Functions
 ============================================================================*/
    $scope.unsentFormsExist = function(){
        return !$scope.unsent_form_count > 0;
    };

    function showLoadingScreen(){
        if (language.getInfo() === "afr") {
            $ionicLoading.show({
                template: "U registrasie word ingedien. Wag asseblief 15s..."
                + "<br /><ion-spinner></ion-spinner>"
            });
        } else {
            $ionicLoading.show({
                template: 'Submitting all registrations - Please wait 15 seconds...'
                + "<br /><ion-spinner></ion-spinner>"
            });
        }
    }

    function hideLoadingScreen(){
        try {
            $ionicLoading.hide();
        } catch (ex){

        }
    }
}); //end home controller
