angular.module('app.controllers', [])

// Constants
.constant('OPENFN_URL', " ")
.constant('SMS_TIMEOUT_PERIOD', 30)   //seconds

.controller('homectrl', function($scope,  $ionicHistory, userinfo) {

    $scope.user = {}

    $scope.clear = function(){
        userinfo.clearInfo();
        $ionicHistory.clearCache();
        alert("All Information has been cleared")
    }

    $scope.network = function(){
        var networkState = navigator.connection.type;
        if (networkState == "none"){
            alert("You currently have no connection.\nYou will not be able to register")
        }
        $scope.device()
    }

    $scope.device = function(){


        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            console.log(device.cordova);
        }

        $scope.user.device_manufacturer = device.manufacturer;
        $scope.user.device_model = device.model;
        $scope.user.device_platform = device.platform;
        $scope.user.device_version = device.version;
        $scope.user.device_uuid = device.uuid;
        $scope.user.device_serial = device.serial;

        userinfo.updateInfo($scope.user)
    }
})

.controller('termsCtrl', function($scope, $ionicHistory, $ionicPopup, $location, userinfo) {

    $scope.user = {}
    $scope.user.usertype = userinfo.info.usertype

    $scope.leave_terms = function() {
        userinfo.updateInfo($scope.user)
        //function either opens pop up or routes depending on $scope.user.usertype
        if ($scope.user.usertype == 'fisher' || $scope.user.usertype == 'co_op' || $scope.user.usertype == 'monitor' ){
            var confirmPopup = $ionicPopup.show({
                title: 'Terms of Use',
                templateUrl: 'templates/popup_terms.html',
                scope: $scope
            });
        }
        else if ($scope.user.usertype == 'fisher_manager'){
            $location.path('/monitor_fmanager_CoOp');
        }
        else{
            $location.path('/personal_details')
        }

        //function within leave_terms that closes popup and routes accordingly
        $scope.sendOrder = function() {
            userinfo.updateInfo($scope.user)
            confirmPopup.close();
            if ($scope.user.usertype == 'co_op' || $scope.user.usertype == 'monitor'){
                $location.path('/monitor_fmanager_CoOp');
            }
            else {  // == fisher
                $location.path('/personal_details');
            }
        }
    }
})//end terms controller

.controller('personal_detailsCtrl', function($scope, $location, userinfo) {

    $scope.user = {}
    $scope.user.usertype = userinfo.info.usertype


    //function to Check Whether password entered and password retyped match
    $scope.match = function(data) {
        var x =true;
        if ($scope.user.password != data) {
            x = false;
        }
        return x;
    }

    //function to check if ID is 13 characters long
    $scope.checkID = function(data) {
        var x =true;
        if (data != null){
            if (data.length != 13) {
                x = false;
            }
            return x;
        }
    }

    //function to go on from personal info
    $scope.next = function(){
        userinfo.updateInfo($scope.user)
        if ($scope.user.usertype == 'fisher'){
            $location.path('/fisher_info');
        }
        else{
            $location.path('/register');
        }
    }

})

.controller('fisher_infoCtrl', function($scope, userinfo, $location) {

    $scope.user = {}

    $scope.next = function(){
        userinfo.updateInfo($scope.user)
        $location.path('/register');
    }
})

.controller('registerCtrl', function($scope,  $location, $ionicLoading, $http, $timeout, userinfo, OPENFN_URL, SMS_TIMEOUT_PERIOD) {

    $scope.user = {}
    $scope.user.cell = userinfo.info.cell;
    $scope.user.cell_dev = userinfo.info.cell_dev;

    $scope.register = function(){

        //injects filter text used by OpenFn to recognise a registration submission.
        $scope.user.filter = "abalobi_registration";

        //converts numbers to Strings and add zeros as needed
        $scope.user.cell = $scope.user.cell.toString();
        if($scope.user.cell.length != 10){
            $scope.user.cell = "0" + $scope.user.cell
        }

        if($scope.user.cell_dev != null){
            $scope.user.cell_dev = $scope.user.cell_dev.toString();
            if($scope.user.cell_dev.length != 10){
                $scope.user.cell_dev = "0" + $scope.user.cell_dev
            }
        }
        userinfo.updateInfo($scope.user)

        //prompts whether the info is correct
        var x = window.confirm("Are You Sure the following is Correct?" + JSON.stringify(userinfo.info, null, 2))
        if (x == true){

            //post http function with success and error results
            $http({
                method: 'POST',
                // url: OPENFN_URL ,
                url: 'http://requestb.in/11gccj91',
                data: JSON.stringify(userinfo.info),
                headers: {'Content-Type': 'application/json'}
            }) .success(function(data, status, headers, config){

                //start timeout call
                var timeout = $timeout(function () {
                    alert("Registration Couldn't Be Completed \nTry again later");
                    $ionicLoading.hide()
                }, SMS_TIMEOUT_PERIOD * 1000);

                //initialize sms plugin
                var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');

                //disable user while waiting
                $ionicLoading.show({
                    template: 'Waiting ' + SMS_TIMEOUT_PERIOD + 's for acknowledgement SMS - please wait...'
                })

                //start sms plugin listening
                smsInboxPlugin.startReception (function(msg) {

                    //filter recieved sms (msg) to see whether it contains tag and on
                    //success notify user of success, cancel timeout and
                    if (msg.indexOf("[Abalobi Registration]") >= 0){
                        $timeout.cancel(timeout);
                        alert("Registration was successful");

                        //stop sms plugin listening disable loading status and route user to home
                        smsInboxPlugin.stopReception (function() {
                            $ionicLoading.hide()
                            $location.path('/home')
                            $scope.$apply();
                        }, function() {
                            alert("Error while stopping the SMS receiver");
                        });
                    }
                }) // end of startReception

            }) //end of success

            .error(function(data, status, headers, config){
                alert("Registration submission failed")
            })
        } //end "if true"
    }
})
