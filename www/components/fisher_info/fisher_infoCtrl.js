angular.module('app.controllers').controller('fisher_infoCtrl', function($scope, userinfo, $location, $http, Storage) {



    //loads information previously entered
    $scope.user = {};
    $scope.user = angular.copy(userinfo.getInfo());

    $scope.$on('$ionicView.enter', function() {
        console.log("Resetting Scope...")
        $scope.user = {};
        $scope.user = angular.copy(userinfo.getInfo());
    })

    //saves info and goes to next page
    $scope.next = function() {

      if ($scope.user.usertype == "daff_manager") {
        alert("TEST", "USER IS A DAFF MANAGER");
      }
      userinfo.updateInfo($scope.user)
      $location.path('/register');
    }

    $scope.evaluateBoatType = function(){
      // console.log("This definitely ran");
      // var carlTest = angular.element('#fisher-boat-type-selector')[0].selectedIndex;
      // var carlTest = angular.element(document).find('#fisher-boat-type-selector option:selected').index();
      // angular.element(document).find(...)
      // carlTest = ($("#dropDownMenuKategorie")[0].selectedIndex);
      // $("#dropDownMenuKategorie")[0].selectedIndex
      // console.log(carlTest);
    }

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
        alert(JSON.stringify(response));
        //alert(response.data)
        $scope.processData(response.data)
      }, function(response){
        // console.log("CSV ERROR OCCURRED.");
        $http.get('data/communities.csv')
        .then(function(response) {
          // alert(JSON.stringify(response));
          //alert(response.data)
          $scope.processData(response.data)
        }, function(response){

        });
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
  }) //end fisher_infoCtrl
