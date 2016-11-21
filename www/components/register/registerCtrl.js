angular.module('app.controllers').controller('registerCtrl', function($scope, $location, $ionicLoading, $http, $timeout, $ionicHistory, $localStorage, language, userinfo, Storage, OPENFN_URL, SMS_TIMEOUT_PERIOD, checkSms, strings) {

    console.log("USER: " + JSON.stringify($scope.user));
    // $scope.user = angular.copy(userinfo.getInfo());
    $scope.user = {};
    console.log("USER2: " + JSON.stringify($scope.user));



    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      console.log(device.cordova);
      console.log("MAIN USERINFO: " + JSON.stringify(userinfo.getInfo()));
      $scope.user.name = userinfo.getInfo().name
      $scope.user.surname = userinfo.getInfo().surname
      $scope.user.id = userinfo.getInfo().id
      $scope.user.cell = userinfo.getInfo().cell

      $scope.user.coop_admin_name = userinfo.getInfo().coop_admin_name
      $scope.user.coop_admin_surname = userinfo.getInfo().coop_admin_surname
      $scope.user.coop_admin_id = userinfo.getInfo().coop_admin_id
      $scope.user.co_op_name = userinfo.getInfo().co_op_name
        //
      $scope.user.device_manufacturer = device.manufacturer;
      $scope.user.device_model = device.model;
      $scope.user.device_platform = device.platform;
      $scope.user.device_version = device.version;
      $scope.user.device_uuid = device.uuid;
      $scope.user.device_serial = device.serial;

      userinfo.updateInfo($scope.user);
    }





    //loads information for display and check by user
    $scope.user.name = userinfo.getInfo().name
    $scope.user.surname = userinfo.getInfo().surname
    $scope.user.id = userinfo.getInfo().id
    $scope.user.cell = userinfo.getInfo().cell

    // //loads information for CO-OP registration
    $scope.user.coop_admin_name = userinfo.getInfo().coop_admin_name
    $scope.user.coop_admin_surname = userinfo.getInfo().coop_admin_surname
    $scope.user.coop_admin_id = userinfo.getInfo().coop_admin_id
    $scope.user.co_op_name = userinfo.getInfo().co_op_name


    $scope.register = function() {

      $scope.showSpinner = false;
      //checks sms permissions and tells user to check inbox if no permission
      checkSms.checkSMSPermission();

      //saves info before post
      userinfo.updateInfo($scope.user);

      //checks for network connection if no connection prompt user to store offline else proceed to post
      var networkState = navigator.connection.type;


      //if no connection
      if (networkState == "none") {
        var confirm = window.confirm(strings.get_translation(strings.REGISTER_OFFLINE));
        if (confirm === true) {
          $localStorage.user = angular.copy(userinfo.getInfo());
          alert(strings.get_translation(strings.REGISTER_INFO_STORED));
        }
      }

      //else connection is present
      else {

        //prompts whether the info is correct
        var x = window.confirm(strings.get_translation(strings.REGISTER_INFO_CONFIRM));
          //Add below for debugging
          // alert(JSON.stringify(userinfo.getInfo(), null, 2))
        if (x === true) {

          //disable user while waiting
          // if (language.getInfo() == "afr") {
          //   $ionicLoading.show({
          //     template: "U registrasie word ingedien. U behoort binne "
          //     + SMS_TIMEOUT_PERIOD
          //     + "s 'n bevestigings SMS te ontvang - wag asseblief..."
          //   });
          // } else {
          //   $ionicLoading.show({
          //     template: 'Your registration is being submitted. You should receive a confirmation SMS within '
          //     + SMS_TIMEOUT_PERIOD
          //     + 's - please wait...'
          //   });
          // }

          //post http function with success and error results

          //TODO: Carl - Create Spinner here
          $scope.showSpinner = true;
          if (language.getInfo() == "afr") {
            $ionicLoading.show({
              template: "U registrasie word ingedien. Wag asseblief..."
              + "<br /><ion-spinner></ion-spinner>"
            });
          } else {
            $ionicLoading.show({
              template: 'Your registration is being submitted. Please wait...'
              + "<br /><ion-spinner></ion-spinner>"
            });
          }


          $http({
              method: 'POST',
              url: OPENFN_URL,
              data: JSON.stringify(userinfo.getInfo()),
              headers: {
                'Content-Type': 'application/json'
              }
            }).success(function(data, status, headers, config) {

              //Cancel the timeout

              // $timeout.cancel(timeout);
              $ionicLoading.hide();
              $scope.showSpinner = false;

              alert(strings.get_translation(strings.REGISTER_SUCCESS));
              //start timeout call
              // var timeout = $timeout(function() {
              //   alert(strings.get_translation(strings.REGISTER_TIMEOUT))
              //   $ionicLoading.hide()
              // }, SMS_TIMEOUT_PERIOD * 1000);

              //initialize sms plugin
              var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');

              //start sms plugin listening
              /*
              smsInboxPlugin.startReception(function(msg) {

                  //filter recieved sms (msg) to see whether it contains tag and on
                  //success notify user of success, cancel timeout and
                  if (msg.indexOf("[Abalobi Registration]") >= 0) {

                    $timeout.cancel(timeout);
                    alert(strings.get_translation(strings.REGISTER_SUCCESS) +
                      "\n" + msg);

                    //stop sms plugin listening disable loading status and route user to home, clean storage on successful submission
                    smsInboxPlugin.stopReception(function() {
                      $localStorage.$reset();
                      $ionicLoading.hide()
                      $location.path('/home.html')
                      $ionicHistory.clearCache();
                      userinfo.clearInfo()
                      $scope.$apply();
                    }, function() {
                      alert("Error while stopping the SMS receiver");
                    });
                  }
                }) // end of startReception
              */
            }) //end of success

          .error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert(strings.get_translation(strings.REGISTER_FAIL) + data);
          });


        } //end "if true"
      }
    }
  }) //end registerCtrl
