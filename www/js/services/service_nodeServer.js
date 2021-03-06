angular.module('app.services').service('nodeServer', ['$http', '$ionicPopup', '$ionicPopover', '$ionicLoading',
'$timeout', '$q', 'strings', '$state', 'REGISTRATION_URL', 'userinfo',
    function($http, $ionicPopup, $ionicPopover, $ionicLoading, $timeout, $q, strings, $state, REGISTRATION_URL, userinfo) {


    // var SERVER_IP = "http://197.85.186.65:8080";
        var SERVER_IP = "https://server.abalobi.org";
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


            $timeout(function(){
                canceller.resolve("Request cancelled");
            }, 3000);

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

    this.getData = function(endpoint, successCB, errorCB){

        //Show ionic blocking loader with timeout
        $ionicLoading.show({
            template: strings.get_translation(strings.COOP_UPDATE_DATA)
            + "<br /><ion-spinner></ion-spinner>"
        });

        // Simple GET request example:
        $http({
            method: 'GET',
            url: SERVER_IP + endpoint,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(successCallback , errorCallback );

        function successCallback(response) {

            console.log("RESPONSE HEADERS: " + JSON.stringify(response.headers, null, 4));
            console.log("DATA FROM SERVER: " + JSON.stringify(response.body, null, 4));
            console.log("RESPONSE: " + response);
            //Cancel the timeout
            successCB(response.data);

            $ionicLoading.hide();

            // alert("Your data was saved successfully!");
        }

        function errorCallback(response) {
            $ionicLoading.hide();
            alert("GET FAILED! " + data);
            errorCB();
        }
    };

    this.postRegistration = function(successCB, errorCB){
        var canceller;

        $timeout(function(){canceller.resolve("Request cancelled");}, 15000);

        canceller = $q.defer();

        console.log(`Going to post to '${REGISTRATION_URL}'`);

        $http({
            method: 'POST',
            url: REGISTRATION_URL,
            data: JSON.stringify(userinfo.getInfo()),
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: canceller.promise
        })
        .success(successCB)
        .error(errorCB)
    };

    this.postRegistrationManually = function(data, successCB, errorCB){
        var canceller;

        $timeout(function(){canceller.resolve("Request cancelled");}, 15000);

        canceller = $q.defer();

        $http({
            method: 'POST',
            url: REGISTRATION_URL,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: canceller.promise
        })
            .success(successCB)
            .error(errorCB)
    };

    this.checkVersion = function(endpoint, sentVersion, successCB, errorCB){
        //Show ionic blocking loader with timeout
        $ionicLoading.show({
            template: "Checking for updates, please wait..."
            + "<br /><ion-spinner></ion-spinner>"
        });

        // Simple GET request example:
        $http({
            method: 'GET',
            url: SERVER_IP + endpoint,
            headers: {
                'Content-Type': 'application/json',
                'currentversion': sentVersion
            }
        }).then(successCallback , errorCallback );

        function successCallback(response) {

            console.log("RESPONSE HEADERS: " + JSON.stringify(response.headers, null, 4));
            console.log("DATA FROM SERVER: " + JSON.stringify(response.body, null, 4));
            console.log("RESPONSE: " + response);
            //Cancel the timeout
            successCB(response.data);

            $ionicLoading.hide();

            // alert("Your data was saved successfully!");
        }

        function errorCallback(response) {
            $ionicLoading.hide();
            // alert("GET FAILED!");
            errorCB();
        }
    }

}]);


/*




 */
