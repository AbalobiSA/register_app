angular.module('app.controllers', [])

// Constants
.constant('OPENFN_URL', " ")
.constant('SMS_TIMEOUT_PERIOD', 30)   //seconds

.value("info", {
}
)

.controller('homectrl', function($scope, $state, $ionicHistory, info) {
  // "clear" function currently used to reset json when Clear button pressed
  //TODO Improve the clear mechanism
  $scope.clear = function(){
   window.location.reload();
  }
})

// Called first time each html page is loaded (not on a "back" navigation)
.controller('register2Ctrl', function($scope, OPENFN_URL, SMS_TIMEOUT_PERIOD, $state, $http, info, $ionicHistory, $ionicPopup, $location, $ionicLoading, $timeout) {

  $scope.blank = {};
  $scope.user = info  // Links to existing data entered on previous html pages

  $scope.update = function() {
  }


  $scope.leave_terms = function() {


    //function either opens pop up or routes depending on $scope.user.usertype
    if ($scope.user.usertype == 'Fisherman' || $scope.user.usertype == 'Co-Operative' || $scope.user.usertype == 'Monitor' ){
      var confirmPopup = $ionicPopup.show({
        title: 'Terms of Use',
        templateUrl: 'templates/popup_terms.html',
        scope: $scope
      });
    }
    else if ($scope.user.usertype == 'Fisher Manager'){
      $location.path('/monitor_fmanager_CoOp');
    }
    else{
      $location.path('/personal_details')
    }

    //function within leave_terms that closes popup and routes accordingly
    $scope.sendOrder = function() {
      confirmPopup.close();
      if ($scope.user.usertype == 'Co-Operative' || $scope.user.usertype == 'Monitor'){
        $location.path('/monitor_fmanager_CoOp');
      }
      else {  // == Fisherman
        $location.path('/personal_details');
      }
    }

  }

  //function to Check Whether password entered and password retyped match
  $scope.match = function(data) {
    var x =true;
    if ($scope.user.password != data) {
      x = false;
    }
    return x;
  }

  $scope.checkID = function(data) {
    var x =true;
    if (data != null){
    if (data.length != 13) {
      x = false;
    }
    return x;
  }
}


  //function that submits data to openFn
  $scope.submitForm = function(isValid, data) {

    //injects filter text used by OpenFn to recognise a registration submission.
    $scope.user.filter = "abalobi_registration";

    //prompts whether the info is correct
    if (true) { //intentional - do not remove.  Linked to isValid/validity
      var x = window.confirm("Are You Sure the following is Correct?" + JSON.stringify($scope.user, null, 2))
      if (x == true){

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

        //post http function with success and error results
        $http({
          method: 'POST',
          url: OPENFN_URL ,
          //    url: 'http://requestb.in/191esan1',
          data: JSON.stringify($scope.user),
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
  }
})
