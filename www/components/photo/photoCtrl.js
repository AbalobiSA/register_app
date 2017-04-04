angular.module('app.controllers').controller('photoCtrl', function($scope, $location, language, matrix, $ionicPopup, userinfo) {
/*============================================================================
    Initialization
 ============================================================================*/

$scope.user = {};
    $scope.user.usertype = userinfo.getInfo().usertype;
    // $scope.user = angular.copy(userinfo.getInfo());

/*============================================================================
    Main Functions
 ============================================================================*/
    $scope.evaluate_bystring = function(destination) {
        switch (destination) {
            case 'photoCtrl_from_photo':
                destinationindex = 13;
                break;

        }
        return (matrix.evaluate($scope.user.usertype, destinationindex))
    };

    //save info and continue to next page
    $scope.next = function() {
        userinfo.updateInfo($scope.user);
        $scope.user.usertype = userinfo.getInfo().usertype;
        if ($scope.evaluate_bystring('photoCtrl_from_photo')) {
            $location.path('/fisher_info');
        } else {
            $location.path('/register');
        }
    };

    //take photo first shows popop selecting either camera or gallery and then saves the photo as well as displays on thumbnail
    $scope.takePhoto = function(id) {

        $scope.type = id;
        var CameraPopup = $ionicPopup.show({
            title: 'Camera',
            templateUrl: 'components/camera_popup/camera_popup.html',
            scope: $scope
        });

        //fetch photo and store via data uri
        $scope.fetchPhoto = function(True_False, id) {

            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady() {
                console.log();
            }

            if (True_False == false) {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 90,
                    targetWidth: 640,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                });
            } else {
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 90,
                    targetWidth: 640,
                    correctOrientation: true,
                    destinationType: Camera.DestinationType.DATA_URL
                });
            }

            function onSuccess(imageData) {
                var image = document.getElementById(id);
                image.src = "data:image/jpeg;base64," + imageData;
                if (id == 'boatpic') {
                    $scope.user.photo_boat = "data:image/jpeg;base64," + imageData;
                    userinfo.updateInfo($scope.user)
                }
                if (id == 'profilepic') {
                    $scope.user.photo_selfie = "data:image/jpeg;base64," + imageData;
                    userinfo.updateInfo($scope.user)
                }
                //alert("data:image/jpeg;base64," + imageData)
                CameraPopup.close();
            }

            function onFail(message) {
                alert(strings.get_translation(strings.REGISTER_FAIL) + message);
                CameraPopup.close();
            }
        }
    }
}); //photoCtrl
