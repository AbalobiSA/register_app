angular.module('app.controllers').controller('personal_detailsCtrl', function($scope, $location, $localStorage, matrix, userinfo, $ionicPopover) {
    //loads information previously entered
    $scope.user = angular.copy(userinfo.getInfo())

    //opens help popover
    $scope.help = function() {
      $ionicPopover.fromTemplateUrl('templates/help.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
        popover.show()
      })
    }

    $scope.autofillme = function() {
      // alert("This works!", "This works!");
      $scope.user.name = "Test User";
      $scope.user.surname = "Test Surname";
      $scope.user.nickname = "Test Nickname";
      $scope.user.email = "test@test.com";
      $scope.user.id = "0123456789012";
      // $scope.user.birth_date = "2016-10-13";
      $scope.user.cell = "0721234567";
      $scope.user.password = "123456";
      $scope.password1 = "123456";
    }

    $scope.evaluate_byindex = function(destination) {
      return (matrix.evaluate($scope.user.usertype, destination))
    }

    //function to Check Whether password entered and password retyped match
    $scope.match = function(data) {
      var x = true;
      if ($scope.user.password != data) {
        x = false;
      }
      return x;
    }

    //function to check if ID is 13 characters long
    $scope.checkID = function(data) {
      var x = true;
      if (data != null) {
        if (data.length != 13) {
          x = false;
        }
        return x;
      }
    }

    //function to go on from personal info
    $scope.next = function() {

      //injects filter text used by OpenFn to recognise a registration submission.
      $scope.user.filter = "abalobi_registration";

      userinfo.updateInfo($scope.user);
      console.log("EDITED: " + JSON.stringify($scope.user));


      $location.path('/photo');
      // alert(JSON.stringify(userinfo));
    }

  }) //end personal_detailsCtrl
