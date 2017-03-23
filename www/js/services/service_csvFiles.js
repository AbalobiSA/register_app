angular.module('app.services').service('csvFiles', ['$http', function($http) {

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    var communities = [];
    var communitiesObj = [];
    var provinces = [];
    var species = [];
    var fishers = [];
    var landingSites = [];
    var monitors = [];
    var baitTypes = [];
    var weather_types = [];
    var wind_directions = [];
    var wind_types = [];
    var sea_conditions = [];




    var initializedStatus = false;

    this.getCommunities = function(){
        return communitiesObj;
    };

    this.getProvinces = function(){
        return provinces;
    };

    this.init = function(callback){
        if (!initializedStatus){
            loadCommunityCSV("communities.csv", function(result){
                communities = result;
                initializedStatus = true;
                callback();
            })
        } else{
            callback();
        }
    };

    function loadCSV(filename, global, callback){
        var FILENAME = filename;
        $http.get('/android_asset/www/data/' + FILENAME)
            .then(function(response) {
                // alert(JSON.stringify(response));
                // alert(response.data)
                global = processCSV(response.data);
                callback(global);
            }, function(response) {
                $http.get('data/' + FILENAME)
                    .then(function(response) {
                        // alert(JSON.stringify(response));
                        // console.log(response.data)
                        global = processCSV(response.data);

                        callback(global);
                    }, function(response) {

                    });
            });
    }

    function loadCommunityCSV(filename, callback){
        var FILENAME = filename;
        $http.get('/android_asset/www/data/' + FILENAME)
            .then(function(response) {
                // alert(JSON.stringify(response));
                // alert(response.data)
               processCommunities(response.data);
                callback();
            }, function(response) {
                $http.get('data/' + FILENAME)
                    .then(function(response) {
                        // alert(JSON.stringify(response));
                        // console.log(response.data)
                        processCommunities(response.data);

                        callback();
                    }, function(response) {

                    });
            });
    }

    function loadExternalCSV(filename, path, global, callback){
        var FILENAME = filename;
        $http.get('/android_asset/www/data/' + FILENAME)
            .then(function(response) {
                // alert(JSON.stringify(response));
                // alert(response.data)
                global = processCSV(response.data);
                callback(global);
            }, function(response) {
                $http.get('data/' + FILENAME)
                    .then(function(response) {
                        // alert(JSON.stringify(response));
                        // console.log(response.data)
                        global = processCSV(response.data);

                        callback(global);
                    }, function(response) {

                    });
            });
    }

    /**
     * Takes any raw csv and returns a JSON array of the data
     * @param csvFile
     * @returns {Array}
     */
    function processCSV(csvFile){
        //Create an empty holding object
        var returnMe = [];
        //Split the CSV file into an array of lines
        var lines = csvFile.split("\n");

        var keyLine = angular.copy(lines[0]);
        var amountOfItems = keyLine.split(",").length;
        var keysList = angular.copy(lines[0]).split(",");

        for (i in lines){

            var currentLine = lines[i].split(",");
            var currentObj = {};

            if (
                i !== 0
                && currentLine.length > 1
            ){
                for (j in currentLine){
                    currentObj[keysList[j].replace("\r","")] = currentLine[j].replace("\r","");
                }

                // console.log("CURRENT OBJECT: " + JSON.stringify(currentObj));

                returnMe.push(currentObj);
            }
        }
        //Now, cut the list to only distinct items
        // return removeDuplicates(provincesList);
        // landingSites = landingSitesList;
        return returnMe;
    }

    function processCommunities(csvFile){
        //Create an empty holding array
        var provincesList = [];
        var communitiesList = [];
        //Split the CSV file into an array of lines
        var lines = csvFile.split("\n");
        for (line in lines){
            var currentLine = lines[line].split(",");
            if (currentLine[0] === "name_key" || currentLine[0] === "" || currentLine[0] === null){
                //Ignore the headings line
            } else{
                pushIfNotNull(communitiesList, currentLine[2]);
                pushIfNotNull(provincesList, currentLine[1]);
                // communitiesList.push(currentLine[0]);
                provincesList.push(currentLine[1]);
                communitiesObj.push({
                    "name_key": currentLine[0].replaceAll("\\r", ""),
                    "province": currentLine[1].replaceAll("\\r", ""),
                    "name_Eng": currentLine[2].replaceAll("\\r", ""),
                    "name_Afr": currentLine[3].replaceAll("\\r", "")
                })
            }
        }
        //Now, cut the list to only distinct items
        // return removeDuplicates(provincesList);
        provinces = removeDuplicates(provincesList);
        communities = removeDuplicates(communitiesList).sort();
    }

    function removeDuplicates(processMe){
        var distinctArray = [];
        for (i in processMe){
            //Check if the item already is in the distinctArray
            if (distinctArray.indexOf(processMe[i]) === -1){
                //push it into the distinct array.
                distinctArray.push(processMe[i]);
            } else{
                //If it is, do nothing
            }
        }
        return distinctArray;
    }

    function pushIfNotNull(arrayObject, pushItem){
        if (pushItem !== null && pushItem !== "" && pushItem !== "Demo Community"){
            arrayObject.push(pushItem);
        } else{

        }
    }

    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function padNumbers(input, paddingAmount) {
        var padding;
        var returnMe = "";
        if (!paddingAmount) {
            padding = 2;
        } else {
            padding = paddingAmount;
        }
        // console.log("Length: " + input.toString().length);
        if (input.length < padding) {

            var zerosToAdd = padding - input.length;
            for (i = 0; i < zerosToAdd; i++) {
                returnMe += "0";
            }
        }
        returnMe += input;
        return returnMe;
    }



    this.isInitialized = function(){
        return initializedStatus;
    }

}]);
