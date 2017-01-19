angular.module('app.controllers').controller('personal_detailsCtrl', function($scope, $location, $localStorage, matrix, userinfo, $ionicPopover) {
    //loads information previously entered
    $scope.user = angular.copy(userinfo.getInfo());

    //opens help popover
    $scope.help = function() {
      $ionicPopover.fromTemplateUrl('components/help/help.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
        popover.show()
      })
    };

    $scope.autofillme = function() {
      $scope.user.name = "Test";
      $scope.user.surname = "TestSurname";
      $scope.user.nickname = "Nickname";
      $scope.user.email = "test@test.com";
      $scope.user.id = "0123456789012";
      $scope.user.birth_date = new Date("2016-10-13");
      // alert("Birth date: " + $scope.user.birth_date);
      $scope.user.cell = "0720641677";
      $scope.user.preferred_language = "English";
      $scope.user.email_is_my_own = true;
      // $scope.user.password = "123456";
      // $scope.password1 = "123456";
    };

    $scope.evaluate_byindex = function(destination) {
      return (matrix.evaluate($scope.user.usertype, destination))
    };

    $scope.regex = "/("+ $scope.user.surname + "|" + $scope.user.name + "|" + "password)/i/g";

    $scope.evaluatePassword = function(){

      // var regexp = /( + $scope.user.surname + | + $scope.user.name + | + password)/g;
      var regexp = new RegExp("(" + $scope.user.surname.toLowerCase() + "|" + $scope.user.name.toLowerCase() + "|" + "password)", "gi");
      // var regexp = new RegExp($scope.user.surname.toLowerCase(), "gi");
      // console.log("Starting Regexp...");
      // console.log("Name: " + $scope.user.name.toLowerCase());
      // console.log("Surname: " + $scope.user.surname.toLowerCase());
      // console.log("Password: " + $scope.user.password);
      // console.log("EXPRESSION: " + regexp);
      try {
        // console.log("REGEXP FUNCTION RESULT: " + regexp.test($scope.user.password));
        if (regexp.test($scope.user.password)){
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e.toString());
        return true;
      }


      // if (regexp.test($scope.user.password)){
      //   console.log("Password is " + regexp.test($scope.user.password));
      //   return true;
      // } else {
      //   console.log("Password is " + regexp.test($scope.user.password));
      //   return false;
      // }

      // if $scope.user.password
    };

    //function to Check Whether password entered and password retyped match
    $scope.match = function(data) {
      var x = true;
      if ($scope.user.password != data) {
        x = false;
      }
      return x;
    };

    //function to check if ID is 13 characters long
    $scope.checkID = function(data) {
      var x = true;
      if (data != null) {
        if (data.length != 13) {
          x = false;
        }
        return x;
      }
    };

    //function to go on from personal info
    $scope.next = function() {

      //injects filter text used by OpenFn to recognise a registration submission.
      $scope.user.filter = "abalobi_registration";

      //Creates UUID with timestamp for filtering in SalesForce
      function generateUUID(){
        var today = new Date();
        var ISOString = today.toISOString();
        return ISOString;
      }
      $scope.user.uuid_timestamp = generateUUID();
      console.log("ACTUAL UUID: " + $scope.user.uuid_timestamp);

      userinfo.updateInfo($scope.user);
      console.log("EDITED: " + JSON.stringify($scope.user));


      $location.path('/photo');
      // alert(JSON.stringify(userinfo));
    }

  }); //end personal_detailsCtrl
