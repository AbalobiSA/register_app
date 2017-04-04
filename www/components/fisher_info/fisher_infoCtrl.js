angular.module('app.controllers').controller('fisher_infoCtrl', function($scope, userinfo, $location, $http, Storage, csvFiles, nodeServer, fileOperations) {

/*==============================================================
     Initialization
 ==============================================================*/

    //loads information previously entered
    $scope.user = {};
    $scope.user = angular.copy(userinfo.getInfo());

    $scope.select = {};
    $scope.communities_filtered = [];

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log("Resetting Scope...");
        $scope.user = {};
        $scope.user = angular.copy(userinfo.getInfo());

        csvFiles.init(function(){
            $scope.communities = csvFiles.getCommunities();
            $scope.provinces = csvFiles.getProvinces();

            //Get the built-in list of coops
            $scope.coops = csvFiles.getCoops();

            //Tries to read external list of coops, or writes built-in list to file
            readCoopsExternal();
        })
    });

/*==============================================================
     Main Functions
 ==============================================================*/

    $scope.refreshCoops = function(){
        var endpoint = "/coops";

        nodeServer.getData(endpoint, dataSuccess, dataError);

        function dataSuccess(response){

            var data = response.data;

            console.log("DEBUG: " + JSON.stringify(data, null, 4));
            $scope.coops = angular.copy(data);


            //DATA IS THE ARRAY OF COOPS.
            fileOperations.writeFileCustom("coop_list.csv", "abalobi/register", csvFiles.convertToCSV(data), "application/csv", function(){
                console.log("Write new list of coops - successful.");
                console.log(csvFiles.convertToCSV(data));
            });
            alert("CO-OP List updated!");
        }

        function dataError(error){

        }
    };

    //saves info and goes to next page
    $scope.next = function() {

        if ($scope.user.usertype === "daff_manager") {
            // alert("TEST", "USER IS A DAFF MANAGER");
        }
        userinfo.updateInfo($scope.user);
        $location.path('/register');
    };

    $scope.select_landingsite = function(site) {
        $scope.user.landingsite = site
    };

    $scope.change = function() {
        $scope.user.landingsite = undefined;
    };

    $scope.changeCoop = function() {
        $scope.user.fisher_co_op_name = undefined;
    };

    $scope.select_coop = function(key){
        $scope.user.fisher_co_op_name = key;
    };

    $scope.filter_by_province = function() {

        $scope.communities_filtered = [];

        for (i in $scope.communities){
            if ($scope.communities[i].province === $scope.select.province){
                $scope.communities_filtered.push($scope.communities[i]);
            }
        }
    };

    $scope.getCommunityName = function(key){
        for (i in $scope.communities){
            if ($scope.communities[i].name_key === key){
                return $scope.communities[i].name_Eng;
            }
        }
    };

    $scope.getGenericName = function(key, item){
        for (i in item){
            if (item[i].name_key === key){
                return item[i].name_Eng;
            }
        }
    };

/*==============================================================
     Tool Functions
 ==============================================================*/

    function readCoopsExternal(){
        csvFiles.loadExternalCSV("abalobi/register/coop_list.csv", csvSuccess, csvError);

        function csvSuccess(data, returnpath, returnfilename){
            console.log("SUCCESSFULLY READ EXTERNAL COOP CSV.");
            $scope.coops = data;
        }

        function csvError(err){
            console.log("COOP CSV FAILED. REVERT TO BACKUP LIST.");
            $scope.coops = csvFiles.getCoops();
            console.log("Writing backup list to external file...");
            fileOperations.writeFileCustom("coop_list.csv", "abalobi/register", csvFiles.convertToCSV($scope.coops), "application/csv", function(){
                console.log("Write backup list of coops - successful.");
                console.log(csvFiles.convertToCSV($scope.coops));
            });
        }
    }






















});
