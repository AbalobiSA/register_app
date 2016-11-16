angular.module('app.controllers').controller('termsCtrl', function($scope, $ionicHistory, $ionicModal, $http, matrix, $ionicPopup, $location, userinfo) {

    $scope.select = {}
    var data = []

    $scope.select_landingsite = function(site) {
      $scope.user.landingsite = site
    }

    $scope.change = function() {
      $scope.user.landingsite = undefined
    }

    $http.get('/android_asset/www/data/communities.csv')
      .then(function(response) {
        //alert(response.data)
        $scope.processData(response.data)
      });

    $scope.processData = function(text) {

      var lines = text.split("\n")
      for (x = 1; x < lines.length - 1; x++) {
        var line = lines[x].split(",")
        data.push(line)
      }

      $scope.provinces = []

      for (x = 0; x < data.length; x++) {
        if ($scope.provinces.indexOf(data[x][1]) == -1) {
          $scope.provinces.push(data[x][1])
        }
      }
    }

    $scope.filter_by_province = function() {

      $scope.landingsites = []
      for (x = 0; x < data.length; x++) {
        if (data[x][1] == $scope.select.province) {
          $scope.landingsites.push(data[x][2])
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
    $scope.reset = function() {

      if (x == true) {
        userinfo.clearInfo();
        $ionicHistory.clearCache();
      }
      x = true;
    }

    $scope.update = function() {
      userinfo.updateInfo($scope.user)
    }

    $scope.evaluate_byindex = function(destination) {
      return (matrix.evaluate($scope.user.usertype, destination))
    }

    $scope.evaluate_bystring = function(destination) {

      var destinationindex

      switch (destination) {
        case 'termsCtrl_open_modal':
          destinationindex = 3
          break;

        case 'termsCtrl_from_modal':
          destinationindex = 4
          break;

        case 'termsCtrl_from_terms':
          destinationindex = 5
          break;

      }
      return (matrix.evaluate($scope.user.usertype, destinationindex))
    }

    $scope.leave_terms = function() {

      //function either opens modal or routes depending on scope.user.usertype

      //route_modal
      if ($scope.evaluate_bystring('termsCtrl_open_modal')) {
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
            if ($scope.evaluate_bystring('termsCtrl_from_modal')) {
              $location.path('/monitor_fmanager_CoOp');
            } else { // == fisher
              $location.path('/personal_details');
            }
          }
        });
      }
      //termstoMFC_personaldetails
      else if ($scope.evaluate_bystring('termsCtrl_from_terms')) {
        userinfo.updateInfo($scope.user)
        $location.path('/monitor_fmanager_CoOp');
      } else {
        userinfo.updateInfo($scope.user)
        $location.path('/personal_details')
      }
    }
  }) //end terms controller
