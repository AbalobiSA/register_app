angular.module('app.controllers', [])

// Constants
.constant('OPENFN_URL', "")
.constant('SMS_TIMEOUT_PERIOD', 30)   //seconds

.controller('homectrl', function($scope, $localStorage, $location, strings, matrix,  $ionicHistory, userinfo) {

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
$scope.clear = function(){
  $localStorage.$reset();
  userinfo.clearInfo();
  $ionicHistory.clearCache();
  alert(strings.get_translation(strings.HOME_CLEAR))
}

//evaluates the current netowrk connection and warns user if offline
$scope.network = function(){
     var networkState = navigator.connection.type;

  if (networkState == "none"){
  alert(strings.get_translation(strings.HOME_NO_CONNECTION))
}
}
})//end home controller

.controller('termsCtrl', function($scope, $ionicHistory, $ionicModal, $http, matrix, $ionicPopup, $location, userinfo) {

  $scope.select = {}
  var data = []

  $scope.select_landingsite = function(site){
    $scope.user.landingsite = site
  }

  $scope.change = function(){
    $scope.user.landingsite = undefined
  }

  $http.get('/android_asset/www/data/communities.csv')
  .then(function(response) {
    //alert(response.data)
    $scope.processData(response.data)
  });

  $scope.processData = function(text) {

    var lines = text.split("\n")
    for (x = 1; x < lines.length-1; x++){
      var line = lines[x].split(",")
      data.push(line)
    }

    $scope.provinces = []

    for (x = 0; x < data.length; x++){
      if ($scope.provinces.indexOf(data[x][2]) == -1){
        $scope.provinces.push(data[x][2])
      }
    }
  }

  $scope.filter_by_province = function(){

    $scope.landingsites = []
    for (x = 0; x < data.length; x++){
      if (data[x][2] == $scope.select.province){
        $scope.landingsites.push(data[x][1])
      }
    }
  }

  //variable that indicates whether usertype has been defined
  var x = false;

  //loads information previously stored offline
  $scope.user = angular.copy(userinfo.getInfo())
  $scope.user.usertype = angular.copy(userinfo.getInfo().usertype)
  //alert(userinfo.getInfo().usertype)

  //if usertype is changed reset fields
  $scope.reset = function(){

    if (x == true){
      userinfo.clearInfo();
      $ionicHistory.clearCache();
    }
    x = true;
  }

  $scope.update = function(){
    userinfo.updateInfo($scope.user)
  }

  $scope.evaluate_byindex = function(destination){
    return (matrix.evaluate($scope.user.usertype, destination))
  }

  $scope.evaluate_bystring = function(destination){

    var destinationindex

    switch(destination){
      case 'termsCtrl_open_modal' :
      destinationindex = 3
      break;

      case 'termsCtrl_from_modal' :
      destinationindex = 4
      break;

      case 'termsCtrl_from_terms' :
      destinationindex = 5
      break;

    }
    return (matrix.evaluate($scope.user.usertype, destinationindex))
  }

  $scope.leave_terms = function() {

    //function either opens modal or routes depending on scope.user.usertype

    //route_modal
    if ($scope.evaluate_bystring('termsCtrl_open_modal')){
      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        modal.show()

        //function within leave_terms that closes popup and routes accordingly
        $scope.sendOrder = function() {
          userinfo.updateInfo($scope.user)
          modal.hide()
          //route_MFC_personaldetails
          if ($scope.evaluate_bystring('termsCtrl_from_modal')){
            $location.path('/monitor_fmanager_CoOp');
          }
          else {  // == fisher
            $location.path('/personal_details');
          }
        }
      });
    }
    //termstoMFC_personaldetails
    else if ($scope.evaluate_bystring('termsCtrl_from_terms')){
      userinfo.updateInfo($scope.user)
      $location.path('/monitor_fmanager_CoOp');
    }
    else{
      userinfo.updateInfo($scope.user)
      $location.path('/personal_details')
    }
  }
})//end terms controller

.controller('personal_detailsCtrl', function($scope, $location, $localStorage, matrix, userinfo, $ionicPopover) {
  //loads information previously entered
  $scope.user = angular.copy(userinfo.getInfo())

  //opens help popover
  $scope.help = function(){
    $ionicPopover.fromTemplateUrl('templates/help.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
      popover.show()
    })
  }

  $scope.evaluate_byindex = function(destination){
    return (matrix.evaluate($scope.user.usertype, destination))
  }

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

    //injects filter text used by OpenFn to recognise a registration submission.
    $scope.user.filter = "abalobi_registration";

    userinfo.updateInfo($scope.user)


    $location.path('/photo');
  }

})//end personal_detailsCtrl

.controller('fisher_infoCtrl', function($scope, userinfo, $location, $http, Storage) {

  //loads information previously entered
  $scope.user = angular.copy(userinfo.getInfo())

  //saves info and goes to next page
  $scope.next = function(){
    userinfo.updateInfo($scope.user)
    $location.path('/register');
  }

  $scope.select = {}
  var data = []

  $scope.select_landingsite = function(site){
    $scope.user.landingsite = site
  }

  $scope.change = function(){
    $scope.user.landingsite = undefined
  }

  $http.get('/android_asset/www/data/communities.csv')
  .then(function(response) {
    //alert(response.data)
    $scope.processData(response.data)
  });

  $scope.processData = function(text) {

    var lines = text.split("\n")
    for (x = 1; x < lines.length-1; x++){
      var line = lines[x].split(",")
      data.push(line)
    }

    $scope.provinces = []

    for (x = 0; x < data.length; x++){
      if ($scope.provinces.indexOf(data[x][2]) == -1){
        $scope.provinces.push(data[x][2])
      }
    }
  }

  $scope.filter_by_province = function(){

    $scope.landingsites = []
    for (x = 0; x < data.length; x++){
      if (data[x][2] == $scope.select.province){
        $scope.landingsites.push(data[x][1])
      }
    }
  }
})//end fisher_infoCtrl

.controller('registerCtrl', function($scope,  $location, $ionicLoading, $http, $timeout, $ionicHistory, $localStorage, language, userinfo, Storage, OPENFN_URL, SMS_TIMEOUT_PERIOD, checkSms, strings) {

  $scope.user = {}

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


//loads information for display and check by user
$scope.user.name = userinfo.getInfo().name
$scope.user.surname = userinfo.getInfo().surname
$scope.user.id = userinfo.getInfo().id
$scope.user.cell = userinfo.getInfo().cell


$scope.register = function(){

  //checks sms permissions and tells user to check inbox if no permission
  checkSms.checkSMSPermission();

  //saves info before post
  userinfo.updateInfo($scope.user)

  //checks for network connection if no connection prompt user to store offline else proceed to post
  var networkState = navigator.connection.type;

  //if no connection
  if (networkState == "none"){
    var confirm = window.confirm(strings.get_translation(strings.REGISTER_OFFLINE))
    if (confirm == true){
      $localStorage.user = angular.copy(userinfo.getInfo());
      alert(strings.get_translation(strings.REGISTER_INFO_STORED))
    }
  }

  //else connection is present
  else {

    //prompts whether the info is correct
    var x = window.confirm(strings.get_translation(strings.REGISTER_INFO_CONFIRM))
    //Add below for debugging
    // alert(JSON.stringify(userinfo.getInfo(), null, 2))
    if (x == true){

      //disable user while waiting
      if (language.getInfo() == "afr"){
        $ionicLoading.show({
          template: 'Wag ' + SMS_TIMEOUT_PERIOD + 's vir bevestigings SMS - wag asseblief...'
        })
      }

      else {
        $ionicLoading.show({
          template: 'Waiting ' + SMS_TIMEOUT_PERIOD + 's for acknowledgement SMS - please wait...'
        })
      }

      //post http function with success and error results
      $http({
        method: 'POST',
        url: OPENFN_URL ,
        //url: 'http://requestb.in/11gccj91',
        data: JSON.stringify(userinfo.getInfo()),
        headers: {'Content-Type': 'application/json'}
      }) .success(function(data, status, headers, config){

        //start timeout call
        var timeout = $timeout(function () {
          alert(strings.get_translation(strings.REGISTER_TIMEOUT))
          $ionicLoading.hide()
        }, SMS_TIMEOUT_PERIOD * 1000);

        //initialize sms plugin
        var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');

        //start sms plugin listening
        smsInboxPlugin.startReception (function(msg) {

          //filter recieved sms (msg) to see whether it contains tag and on
          //success notify user of success, cancel timeout and
          if (msg.indexOf("[Abalobi Registration]") >= 0){

            $timeout.cancel(timeout);
            alert(strings.get_translation(strings.REGISTER_SUCCESS))

            //stop sms plugin listening disable loading status and route user to home, clean storage on successful submission
            smsInboxPlugin.stopReception (function() {
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

      }) //end of success

      .error(function(data, status, headers, config){
        $ionicLoading.hide()
        alert(strings.get_translation(strings.REGISTER_FAIL) + data)
      })


    } //end "if true"
  }
}
})//end registerCtrl

.controller('photoCtrl', function($scope, $location, language, matrix, $ionicPopup, userinfo) {

  $scope.user = {}

  $scope.evaluate_bystring = function(destination){
    switch(destination){
      case 'photoCtrl_from_photo' :
      destinationindex = 13
      break;

    }
    return (matrix.evaluate($scope.user.usertype, destinationindex))
  }

  //save info and continue to next page
  $scope.next = function(){
    userinfo.updateInfo($scope.user)
    $scope.user.usertype = userinfo.getInfo().usertype
    if ($scope.evaluate_bystring('photoCtrl_from_photo')){
      $location.path('/fisher_info');
    }
    else{
      $location.path('/register');
    }
  }

  //take photo first shows popop selecting either camera or gallery and then saves the photo as well as displays on thumbnail
  $scope.takePhoto = function(id){

    $scope.type = id
    var CameraPopup = $ionicPopup.show({
      title: 'Camera',
      templateUrl: 'templates/camera_popup.html',
      scope: $scope
    })

    //fetch photo and store via data uri
    $scope.fetchPhoto = function(True_False, id){

      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        console.log();
      }

      if (True_False == false){
        navigator.camera.getPicture(onSuccess, onFail,
          { quality: 10,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY}
          );
        }
        else {
          navigator.camera.getPicture(onSuccess, onFail,
            { quality: 10,
              destinationType: Camera.DestinationType.DATA_URL }
            );
          }

          function onSuccess(imageData) {
            var image = document.getElementById(id);
            image.src = "data:image/jpeg;base64," + imageData;
            if (id == 'boatpic'){
              $scope.user.photo_boat = "data:image/jpeg;base64," + imageData;
              userinfo.updateInfo($scope.user)
            }
            if (id == 'profilepic'){
              $scope.user.photo_selfie = "data:image/jpeg;base64," + imageData;
              userinfo.updateInfo($scope.user)
            }
            //alert("data:image/jpeg;base64," + imageData)
            CameraPopup.close();
          }
          function onFail(message) {
            alert(strings.get_translation(strings.REGISTER_FAIL)  + message)
            CameraPopup.close();
          }
        }
      }
    })//photoCtrl
