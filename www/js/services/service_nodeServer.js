angular.module('app.services').service('nodeServer', ['$http', '$ionicPopup', '$ionicPopover', '$ionicLoading', '$timeout', '$q',
    function($http, $ionicPopup, $ionicPopover, $ionicLoading, $timeout, $q) {


    var SERVER_IP = "http://197.85.186.65:8080";
    // var SERVER_IP = "http://127.0.0.1:8080";

    this.init = function(callback) {
        callback();
    };

    this.uploadJSON = function(input, success, error) {

        var showSpinner = false;
        //checks for network connection if no connection prompt user to store offline else proceed to post

        var networkState;
        try{
            networkState = navigator.connection.type;
        } catch (ex){
            networkState = "CELL_4G";
        }

        //if no connection
        if (networkState === "none") {
            var confirm = window.confirm("No network connection. Save files offline?");
            if (confirm === true) {
                error();
            }
        }

        //else connection is present
        else {
            var canceller;
            showSpinner = true;
            $ionicLoading.show({
                template: 'Your forms are being uploaded. Please wait 15 seconds...'
                + "<br /><ion-spinner></ion-spinner>"
            });


            $timeout(function(){canceller.resolve("Request cancelled");}, 15000);

            canceller = $q.defer();

            $http({
                method: 'POST',
                url: 'https://www.openfn.org/inbox/3afab0f1-3937-4ca8-95a3-5491f6f32a4e',
                data: input,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: canceller.promise
            }).success(function(data, status, headers, config) {

                //Cancel the timeout
                success();

                // $timeout.cancel(timeout);
                $ionicLoading.hide();
                showSpinner = false;

                // alert("Your forms were uploaded successfully!");
            }) //end of success
            .error(function(data, status, headers, config) {
                $ionicLoading.hide();
                alert("POST FAILED! " + data);
                error();
            });

        }
    };

    this.postLocally = function(data, success, error){
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8080',
            data: dataStore.getDataStore(),
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data, status, headers, config) {
            //Cancel the timeout
            success(data);

            alert("Your data was saved successfully!");
        }) //end of success
        .error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert("POST FAILED! " + data);
            error();
        });
    };

    this.getData = function(endpoint, success, error){

        //Show ionic blocking loader with timeout

        $http({
            method: 'GET',
            url: SERVER_IP + endpoint,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data, status, headers, config) {
            //Cancel the timeout
            success(data.data);

            // alert("Your data was saved successfully!");
        }) //end of success
        .error(function(data, status, headers, config) {
            $ionicLoading.hide();
            alert("POST FAILED! " + data);
            error();
        });
    }

}]);


/*




 */
