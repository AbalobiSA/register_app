angular.module('app.services').service('fileOperations', ['$ionicPopup', '$state', function($ionicPopup, $state) {

    var globalCallback = function(){};

    var fo = this;
    /**
     * Method used to write a file to a custom location on the user's phone.
     * Will assume you are writing a JSON file if no mime type is provided.
     * @param filename
     * @param filepath
     * @param info
     * @param mime_type
     * @param success
     */
    this.writeFileCustom = function(filename, filepath, info, mime_type, success) {

        //Config Variables
        var ABALOBI_FILE_DATA = info;
        var ABALOBI_FILE_PATH = filepath;
        var ABALOBI_FILE_NAME = filename;
        var ABALOBI_FILE_TYPE;

        if (mime_type){
            ABALOBI_FILE_TYPE = mime_type;
        } else{
            ABALOBI_FILE_TYPE = "application/json";
        }

        // console.debug("Received file for writing. Details: \n" +
        //     "Info: " + ABALOBI_FILE_DATA + "\n" +
        //     "Path: " + ABALOBI_FILE_PATH + "\n" +
        //     "Name: " + ABALOBI_FILE_NAME + "\n" +
        //     "Type: " + ABALOBI_FILE_TYPE + "\n");

        // console.log("STARTING FILE WRITING PROCESS...");
        try {
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(directory) {
                // console.log("DIR IS: " + directory.name);

                createDirectory(directory, ABALOBI_FILE_PATH, function(info) {
                    // console.log("INFO" + info);
                    // console.log("ATTEMPTING TO WRITE FILE...");

                    info.getFile(ABALOBI_FILE_NAME, {
                        create: true
                    }, function(file) {
                        // console.log("got the file", file);
                        writeFile(file, ABALOBI_FILE_DATA, true);

                        var popupParams = {
                            title: 'Settings Saved', // String. The title of the popup.
                            cssClass: '', // String, The custom CSS class name
                            subTitle: '', // String (optional). The sub-title of the popup.
                            template: 'Your settings have been saved!', // String (optional). The html template to place in the popup body.
                            templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                            okText: '', // String (default: 'OK'). The text of the OK button.
                            okType: '' // String (default: 'button-positive'). The type of the OK button.
                        };
                        // $ionicPopup.alert(popupParams);
                        // $state.go("home");
                        // console.log("File Written!\n" +
                        //     "Path: " + filepath + "\n" +
                        //     "Name: " + filename);

                    });


                });
                // dir.filesystem.root.getDirectory(ABALOBI_FILE_PATH, { create: true }, gotDir);

            });
        } catch (ex) {
            // alert("YOU ARE NOT ON MOBILE!\n" + ex);
            // console.log("Unable to write to local storage." +
            //     "\nThis could either be due to using a browser, " +
            //     "or not having file access permissions.\n\n" +
            //     "Additionally: " + ex);
        }



        function createDirectory(dir, path, success) {
            var dirs = path.split("/").reverse();
            var root = dir.filesystem.root;

            var createDir = function(dir) {
                // console.log("create dir " + dir);
                root.getDirectory(dir, {
                    create: true,
                    exclusive: false
                }, successCB, failCB);
            };

            var successCB = function(entry) {
                // console.log("dir created " + entry.fullPath);
                root = entry;
                if (dirs.length > 0) {
                    createDir(dirs.pop());
                } else {
                    // console.log("all dir created");
                    success(entry);
                }
            };

            var failCB = function() {
                // console.log("failed to create dir " + dir);
            };

            createDir(dirs.pop());

        }

        function writeFile(fileEntry, dataObj, isAppend) {
            // console.log("TRIGGERING WRITEFILE...");

            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function(fileWriter) {

                fileWriter.onwriteend = function() {
                    // console.log("Successful file read...");
                    // readFile(fileEntry);
                };

                fileWriter.onerror = function(e) {
                    // console.log("Failed file read: " + e.toString());
                };

                // If we are appending data to file, go to the end of the file.
                if (isAppend) {
                    try {
                        // fileWriter.seek(fileWriter.length);
                    } catch (e) {
                        // console.log("file doesn't exist!");
                    }
                }

                var blob = new Blob([dataObj], { type: ABALOBI_FILE_TYPE });
                fileWriter.write(blob);

                console.log("Logging file information after write:");
                // console.log(ABALOBI_FILE_DATA);
                console.log("Path: " + ABALOBI_FILE_PATH);
                console.log("Name: " + ABALOBI_FILE_NAME);
                // console.log(ABALOBI_FILE_TYPE);

                if (success != undefined){
                    success();
                }
                // fileWriter.write(dataObj);
            });
        }

    }; //End of file writer

    this.readFileCustom = function(fullfilepath, success, error) {

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            console.log("CORDOVA FILE: " + cordova.file);

            var ABALOBI_FILE_PATH = fullfilepath;

            var jsonFromFile = "";

            console.debug("STARTING FILE READING PROCESS...");
            console.log("Printing debug information: \n" +
                "File path: " + ABALOBI_FILE_PATH);
            try {
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + ABALOBI_FILE_PATH, function(fileEntry) {
                    // console.log("DIR IS: " + directory.name);
                    // dir.filesystem.root.getDirectory(ABALOBI_FILE_PATH, { create: true }, gotDir);
                    console.log("Got the directory. Reading...");
                    fileEntry.file(function(file) {
                        var reader = new FileReader();

                        reader.onloadend = function(e) {
                            console.debug("FILE WAS READ SUCCESSFULY.");
                            console.debug("Text is: " + this.result);
                            // document.querySelector("#textArea").innerHTML = this.result;
                            jsonFromFile = JSON.parse(this.result);
                            // alert(JSON.stringify(jsonFromFile));
                            success(jsonFromFile);
                        };

                        reader.readAsText(file);

                    });
                });
            } catch (ex) {
                // alert("NO SETTINGS FOUND!!\n" + ex);
                error();
                console.error("File reading failed!\n\n" + ex);

            }
        }



    }; //End of file writer

    this.getFileCount = function(callback){

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        }

        function onFileSystemSuccess(fileSystem) {
            var directoryEntry = fileSystem.root;
            //Try create the directory first
            console.log("CREATING PIPELINE:::");
            createDirectory(fileSystem.root, "abalobi/monitorsurvey/pipeline", function(info){
                // console.log("Pipeline created.");
                directoryEntry.getDirectory("abalobi/monitorsurvey/pipeline", {create: false, exclusive: false}, onDirectorySuccess, onDirectoryFail);
            });




        }

        function onDirectorySuccess(parent) {
            var directoryReader = parent.createReader();
            directoryReader.readEntries(success, fail);
        }

        function fail(error) {
            // alert("Failed to list directory contents: " + error.code);
            callback(0);
        }

        function success(entries) {
            if (entries.length == 0){
                // console.log("No Records");
                callback(0);
            }
            else
            {
                for (var i = 0; i < entries.length; i++) {
                    entries[i].file(function (file) {
                        // console.log("file.name " + file.name);
                    })
                }
                callback(entries.length);
            }
            // console.log('file list created');

        }

        function onDirectoryFail(error) {
            console.error("Unable to create pipeline directory: " + error.code);
            callback(0);
        }

        function onFileSystemFail(evt) {
            console.log(evt.target.error.code);
            callback(0);
        }

        //LEAVE THIS HERE
        function createDirectory(dir, path, success) {
            var dirs = path.split("/").reverse();
            var root = dir.filesystem.root;

            var createDir = function(dir) {
                // console.log("create dir " + dir);
                root.getDirectory(dir, {
                    create: true,
                    exclusive: false
                }, successCB, failCB);
            };

            var successCB = function(entry) {
                // console.log("dir created " + entry.fullPath);
                root = entry;
                if (dirs.length > 0) {
                    createDir(dirs.pop());
                } else {
                    // console.log("all dir created");
                    success(entry);
                }
            };

            var failCB = function() {
                // console.log("failed to create dir " + dir);
            };

            createDir(dirs.pop());

        }
    };

    this.getPipelineForms = function(successCallback, errorCallback){

        document.addEventListener("deviceready", onDeviceReady, false);

        var formsArray = [];

        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        }

        function onFileSystemSuccess(fileSystem) {
            var directoryEntry = fileSystem.root;
            directoryEntry.getDirectory("abalobi/monitorsurvey/pipeline", {create: false, exclusive: false}, onDirectorySuccess, onDirectoryFail);
        }

        function onDirectorySuccess(parent) {
            var directoryReader = parent.createReader();
            directoryReader.readEntries(success, fail);
        }

        function fail(error) {
            // alert("Failed to list directory contents: " + error.code);
            errorCallback();
            // callback(0);
        }

        function success(entries) {
            if (entries.length == 0){
                // console.log("No Records");
                errorCallback();
                // callback(0);
            }
            else
            {
                for (var i = 0; i < entries.length; i++) {
                    entries[i].file(function (file) {
                        // console.log(file.data);

                        var reader = new FileReader();

                        reader.onloadend = function() {
                            // console.log("Successful file read: " + this.result);
                            // displayFileData(fileEntry.fullPath + ": " + this.result);
                            successCallback(this.result, "abalobi/monitorsurvey/pipeline/", file.name);
                        };

                        reader.readAsText(file);
                        // formsArray.push(JSON.stringify(file));
                        // console.log("file.name " + file.name);
                    })
                }
            }
            // console.log('file list created');
            // successCallback(formsArray);
            // callback(entries.length);
        }

        function onDirectoryFail(error) {
            // alert("Unable to create new directory: " + error.code);
            // callback(0);
            errorCallback();
        }

        function onFileSystemFail(evt) {
            console.log(evt.target.error.code);
            errorCallback();
            // callback(0);
        }
    };

    this.getFileSafe = function(filepath, successCallback, errorCallback){

        document.addEventListener("deviceready", onDeviceReady, false);

        var formsArray = [];

        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        }

        function onFileSystemSuccess(fileSystem) {
            var directoryEntry = fileSystem.root;
            directoryEntry.getDirectory("abalobi/register", {create: true, exclusive: false}, onDirectorySuccess, onDirectoryFail);
        }

        function onDirectorySuccess(parent) {
            var directoryReader = parent.createReader();
            directoryReader.readEntries(success, fail);
        }

        function fail(error) {
            // alert("Failed to list directory contents: " + error.code);
            errorCallback();
            // callback(0);
        }

        function success(entries) {
            if (entries.length === 0){
                console.log("No Records");
                errorCallback();
                // callback(0);
            }
            else
            {
                for (var i = 0; i < entries.length; i++) {
                    entries[i].file(function (file) {
                        // console.log(file.data);

                        var reader = new FileReader();

                        reader.onloadend = function() {
                            // console.log("Successful file read: " + this.result);
                            // displayFileData(fileEntry.fullPath + ": " + this.result);
                            successCallback(this.result, "abalobi/register/", file.name);
                        };

                        reader.readAsText(file);
                        // formsArray.push(JSON.stringify(file));
                        // console.log("file.name " + file.name);
                    })
                }
            }
            // console.log('file list created');
            // successCallback(formsArray);
            // callback(entries.length);
        }

        function onDirectoryFail(error) {
            // alert("Unable to create new directory: " + error.code);
            // callback(0);
            errorCallback();
        }

        function onFileSystemFail(evt) {
            console.log(evt.target.error.code);
            errorCallback();
            // callback(0);
        }
    };

    this.deleteFile = function(path, success, error){
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady(){
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory + path, function(file) {
                file.remove(function(){
                    console.log(cordova.file.externalRootDirectory + path + " deleted");
                    success();
                }, function(err){
                    error();
                    console.log(err.toString());
                });
            }, function(err){
                error();
                console.log(err.toString());
            });
        }

    };

    function JSONtoArray(input){
        var returnMe = [];
        for (var key in input) {
            if (input.hasOwnProperty(key)) {
                returnMe.push(input[key]);
            }
        }
        return returnMe;
    }

    function createFileTimestamp(){
        var input = (new Date());
        var year = padNumbers(input.getFullYear().toString());
        var month = padNumbers((input.getMonth() + 1).toString());
        var day = padNumbers(input.getDate().toString());
        var hours = padNumbers(input.getHours().toString());
        var minutes = padNumbers(input.getMinutes().toString());
        var seconds = padNumbers(input.getSeconds().toString());

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

        return year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds + ".json";
    }

}]);
