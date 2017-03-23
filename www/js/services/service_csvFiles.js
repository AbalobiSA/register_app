angular.module('app.services').service('csvFiles', ['$http', function($http) {

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

    this.init = function(callback){
        if (!initializedStatus){
            // loadCSV("List_SeaConditions.csv", sea_conditions, function(result){
            //     sea_conditions = result;
            //     initializedStatus = true;
                callback();
            // })
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
