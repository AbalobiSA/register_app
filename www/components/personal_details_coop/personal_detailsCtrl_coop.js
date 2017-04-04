angular.module('app.controllers').controller('personal_detailsCtrl_coop', function($scope, $location, $localStorage, matrix, userinfo, $ionicPopover, settings) {
/*============================================================================
    Initialization
 ============================================================================*/
    //loads information previously entered
    $scope.user = {};
    $scope.user = angular.copy(userinfo.getInfo());
    $scope.srv_settings = settings;

    $scope.$on('$ionicView.enter', function() {
        console.log("Resetting Scope...");
        $scope.user = {};
        $scope.user = angular.copy(userinfo.getInfo());
    });

/*============================================================================
    Main Functions
 ============================================================================*/

    //opens help popover
    $scope.help = function() {
        $ionicPopover.fromTemplateUrl('components/help/help.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
            popover.show()
        })
    };

    $scope.autofillme = function() {
        // alert("This works!", "This works!");
        $scope.user.coop_admin_name = "Test CO-OP Owner";
        $scope.user.coop_admin_surname = "Test Co-Op Surname";
        $scope.user.coop_admin_nickname = "Test Nickname";
        // $scope.user.email = "test@test.com";
        $scope.user.coop_admin_id = "0123456789012";
        // $scope.user.birth_date = "2016-10-13";
        // $scope.user.cell = "0721234567";
        // $scope.user.password = "123456";
        // $scope.password1 = "123456";
    };

    $scope.evaluate_byindex = function(destination) {
        return (matrix.evaluate($scope.user.usertype, destination))
    };

    $scope.evaluatePassword = function(){
        var regexp = new RegExp("(" + $scope.user.surname.toLowerCase() + "|" + $scope.user.name.toLowerCase() + "|" + "password)", "gi");

        try {
            return regexp.test($scope.user.password);
        } catch (e) {
            console.log(e.toString());
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

    //function to check if ID is 13 characters long
    $scope.checkID = function(data) {
        var x = true;
        if (data !== null && data !== undefined) {
            if (data.length !== 13) {
                x = false;
            }
            return x;
        }
    };

    //function to go on from personal info
    $scope.next = function() {

        //injects filter text used by OpenFn to recognise a registration submission.
        $scope.user.filter = "abalobi_registration";
        // $scope.user = {};
        console.log("GOING TO SUMMARY...");

        function generateUUID(){
            var today = new Date();
            return today.toISOString();
        }

        $scope.user.uuid_timestamp = generateUUID();
        console.log("ACTUAL UUID: " + $scope.user.uuid_timestamp);

        userinfo.updateInfo($scope.user);
        $scope.user.usertype = userinfo.getInfo().usertype;

        $location.path('/register_coop_summary');
    }

}); //end personal_detailsCtrl
