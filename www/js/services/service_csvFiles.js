angular.module('app.services').service('csvFiles', ['$http', 'fileOperations', function($http, fileOperations) {

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    var communities = [];
    var communitiesObj = [];
    var provinces = [];
    var coops = [];

    var csv = this;

    var initializedStatus = false;

/*====================================================================
    Getters
 ====================================================================*/

    this.getCommunities = function(){
        return communitiesObj;
    };

    this.getProvinces = function(){
        return provinces;
    };

    this.getCoops = function(){
        return coops;
    };

    this.init = function(callback){
        if (!initializedStatus){
            loadCommunityCSV("communities.csv", function(result){
                // communities = result;
                loadCSV("list_co_ops.csv", coops, function(result){
                    coops = result;
                    initializedStatus = true;
                    callback();
                })
            })
        } else{
            callback();
        }
    };

/*====================================================================
     CSV Modules
 ====================================================================*/

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

    this.loadExternalCSV = function(fullpath, successCallback, errorCallback){
        // var FILENAME = filename;
        // fullpath = "abalobi/register/coop_list.csv";

        // fileOperations.readFileCustom(fullpath, success, error);

        fileOperations.getFileSafe(fullpath, success, error);

        function success(data, returnpath, returnfilename){
            successCallback(processCSV(data), returnpath, returnfilename);
        }

        function error(err){
            errorCallback(err);
        }
    };

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
                i > 0
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

/*====================================================================
     Custom Handlers
 ====================================================================*/

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

/*====================================================================
     Tools
 ====================================================================*/

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

    this.convertToCSV = function(input) {

        //Remove hashkeys
        var objArray = angular.copy(input);

        //Get the keys
        var keysStr = "";
        var keysLength = countKeys(objArray[0]);
        var count = 0;
        for (key in objArray[0]){
            keysStr += key + noCommaIfLast(keysLength, count);
            count++;
        }

        //Add data
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return keysStr + "\r\n" + str;

        function countKeys(input){
            var count = 0;
            for (i in input){
                count++;
            }
            return count;
        }

        function noCommaIfLast(length, current){
            if (current === length-1){
                return "";
            } else{
                return ",";
            }
        }
    };

    this.isInitialized = function(){
        return initializedStatus;
    }

}]);
