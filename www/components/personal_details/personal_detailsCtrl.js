angular.module('app.controllers').controller('personal_detailsCtrl', function($scope, $location, $localStorage, matrix, userinfo, $ionicPopover, settings) {

/*============================================================================
    Init
 ============================================================================*/
    //loads information previously entered
    $scope.user = angular.copy(userinfo.getInfo());
    $scope.srv_settings = settings;

    $scope.user.gender = "unselected";
    console.log("GENDER: " + $scope.user.gender);

    //opens help popover
    $scope.help = function() {
        $ionicPopover.fromTemplateUrl('components/help/help.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
            popover.show()
        })
    };

/*============================================================================
    Debug
 ============================================================================*/

    $scope.autofillme = function() {
        $scope.user.name = "Test";
        $scope.user.surname = "TestSurname";
        $scope.user.nickname = "Nickname";
        $scope.user.email = "test@test.com";
        $scope.user.id = "0123456789012";
        $scope.user.birth_date = new Date("1993-07-21");
        // alert("Birth date: " + $scope.user.birth_date);
        $scope.user.cell = "0720641677";
        $scope.user.preferred_language = "English";
        $scope.user.email_is_my_own = true;
        $scope.user.gender = "male";
        $scope.user.password = "123456";
        $scope.password1 = "123456";
    };

/*============================================================================
    Navigation
 ============================================================================*/

    $scope.evaluate_byindex = function(destination) {
      return (matrix.evaluate($scope.user.usertype, destination))
    };

/*============================================================================
    Validation
 ============================================================================*/

    $scope.regex = "/("+ $scope.user.surname + "|" + $scope.user.name + "|" + "password)/i/g";

    $scope.evaluatePassword = function(){

        // var regexp = /( + $scope.user.surname + | + $scope.user.name + | + password)/g;
        var regexp = new RegExp("(" + protectIfUndefined($scope.user.surname) + "|" + protectIfUndefined($scope.user.name) + "|" + "password)", "gi");
        // var regexp = new RegExp($scope.user.surname.toLowerCase(), "gi");
        // console.log("Starting Regexp...");
        // console.log("Name: " + $scope.user.name.toLowerCase());
        // console.log("Surname: " + $scope.user.surname.toLowerCase());
        // console.log("Password: " + $scope.user.password);
        // console.log("EXPRESSION: " + regexp);
        try {
            // console.log("REGEXP FUNCTION RESULT: " + regexp.test($scope.user.password));
            return regexp.test($scope.user.password);
        } catch (e) {
            console.log(e.toString());
            return true;
        }

        function protectIfUndefined(input){
            if (input === undefined || input === null){
                return "";
            } else{
                return input.toLowerCase();
            }
        }

    };

    $scope.customValidation = function(){
        if ($scope.validateGender()){
            return true;
        }
    };

    $scope.validateGender = function(){
        if ($scope.user.gender === "unselected"){
            return true;
        }
    };

    //function to Check Whether password entered and password retyped match
    $scope.match = function(data) {
        var x = true;
        if ($scope.user.password !== data) {
            x = false;
        }
        return x;
    };

    //function to check ID
    $scope.checkID = function(data) {
        let regex = RegExp("^[a-zA-Z0-9]+$");
        if (data === null || data === undefined) return false;
        return regex.test(data);
    };

    $scope.checkCell = function(data) {
        let regex = RegExp('^[+][0-9]+$');
        return regex.test(data);
    }

/*============================================================================
    Button Navigation
 ============================================================================*/

    //function to go on from personal info
    $scope.next = function() {

        //injects filter text used by OpenFn to recognise a registration submission.
        $scope.user.filter = "abalobi_registration";

        //Creates UUID with timestamp for filtering in SalesForce
        function generateUUID(){
            var today = new Date();
            return today.toISOString();
        }

        $scope.user.uuid_timestamp = generateUUID();
        console.log("ACTUAL UUID: " + $scope.user.uuid_timestamp);
        console.log("ACTUAL GENDER: " + $scope.user.gender);


        userinfo.updateInfo($scope.user);
        console.log("EDITED: " + JSON.stringify($scope.user));


        $location.path('/photo');
        // alert(JSON.stringify(userinfo));
    }

  }); //end personal_detailsCtrl
