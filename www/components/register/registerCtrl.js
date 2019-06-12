angular.module('app.controllers').controller( 'registerCtrl',
function($scope, $q, $location, $ionicLoading, $http, $timeout,
$ionicHistory, $localStorage, language, userinfo, Storage,
REGISTRATION_URL, SMS_TIMEOUT_PERIOD, checkSms, strings, fileOperations, $state, nodeServer) {
/*============================================================================
    Initialization
 ============================================================================*/

    console.log("OLD USER INFO: " + JSON.stringify($scope.user));
    // $scope.user = angular.copy(userinfo.getInfo());
    $scope.user = {};

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        console.log(device.cordova);
        console.log("MAIN USERINFO: " + JSON.stringify(userinfo.getInfo()));

        loadUserInfo();
        loadDeviceInfo();
    }

    function loadUserInfo(){
        //loads information for display and check by user
        $scope.user.name = userinfo.getInfo().name;
        $scope.user.surname = userinfo.getInfo().surname;
        $scope.user.id = userinfo.getInfo().id;
        $scope.user.cell = userinfo.getInfo().cell;

        // //loads information for CO-OP registration
        $scope.user.coop_admin_name = userinfo.getInfo().coop_admin_name;
        $scope.user.coop_admin_surname = userinfo.getInfo().coop_admin_surname;
        $scope.user.coop_admin_id = userinfo.getInfo().coop_admin_id;
        $scope.user.co_op_name = userinfo.getInfo().co_op_name;
    }

    function loadDeviceInfo(){
        $scope.user.device_manufacturer = device.manufacturer;
        $scope.user.device_model = device.model;
        $scope.user.device_platform = device.platform;
        $scope.user.device_version = device.version;
        $scope.user.device_uuid = device.uuid;
        $scope.user.device_serial = device.serial;

        userinfo.updateInfo($scope.user);
    }

    loadUserInfo();

/*============================================================================
    Main Methods
 ============================================================================*/

    $scope.register = function() {

        //saves info before post
        userinfo.updateInfo($scope.user);

        //checks for network connection if no connection prompt user to store offline else proceed to post
        var networkState;

        // If you can't get network state, you are probably using a browser.
        // Force the connection to CELL_4G
        try{
            networkState = navigator.connection.type;
        } catch (ex){
            networkState = "CELL_4G";
        }

        //if no connection
        if (networkState === "none") {
            storeFormPrompt();
        }

        //else connection is present
        else {
            //prompts whether the info is correct
            postRegistrationPrompt();
        }
    };

/*============================================================================
    Functions
 ============================================================================*/

    /**
     * Ask if details are correct, then try to send to OpenFn.
     * Success -> clear forms
     * Fail -> save form to pipeline
     */
    function postRegistrationPrompt(){
        var x = window.confirm(strings.get_translation(strings.REGISTER_INFO_CONFIRM));
        if (x === true) {
            showLoadingScreen();

            nodeServer.postRegistration(postSuccess, postError);

            function postSuccess(data, status, headers, config){
                $ionicLoading.hide();
                alert(strings.get_translation(strings.REGISTER_SUCCESS));
                clearForm();
                $state.go("home");
            }

            function postError(data, status, headers, config){
                $ionicLoading.hide();
                alert(strings.get_translation(strings.REGISTER_FAIL) + data);
                saveFormToPipeline();
                $state.go("home");
            }
        } //end "if true"
    }


    /**
     * Ask user if they want to store form for later, or do nothing
     */
    function storeFormPrompt(){
        var confirm = window.confirm(strings.get_translation(strings.REGISTER_OFFLINE));
        if (confirm === true) {

            saveFormToPipeline();
            alert(strings.get_translation(strings.REGISTER_INFO_STORED));
            $state.go("home");
        }
    }

    function showLoadingScreen(){
        if (language.getInfo() === "afr") {
            $ionicLoading.show({
                template: "U registrasies word ingedien. Wag asseblief 15s..."
                + "<br /><ion-spinner></ion-spinner>"
            });
        } else {
            $ionicLoading.show({
                template: 'Your registration is being submitted. Please wait 15 seconds...'
                + "<br /><ion-spinner></ion-spinner>"
            });
        }
    }

    function saveFormToPipeline(){
        $localStorage.user = angular.copy(userinfo.getInfo());
        fileOperations.saveToPipeline(angular.copy($localStorage.user));

        clearForm();
    }

    function clearForm(){
        // $localStorage.user = angular.copy({});
        // $scope.user = angular.copy({});
        $localStorage.$reset();
        userinfo.clearInfo();
        $ionicHistory.clearCache();
    }

}); //end registerCtrl
