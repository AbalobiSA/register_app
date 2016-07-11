angular.module('app.strings', [])

.service('strings', ['language', function(language){


    var strings = {

        "HOME_SELECT_HEADING" : "Select Language -- Kies Taal",
        "HOME_CLEAR": {
            "en" : "All Information has been cleared",
            "afr" :"Alle informasie is nou uitgevee"
        },
        "HOME_NO_CONNECTION" : {
            "en" :"You currently have no connection.\nYou will not be able to register.",
            "afr" :  "U het tans geen internet toegang, u sal nie kan registreer nie"
        },
        "REGISTER_OFFLINE" : {
            "en" :"You are offline. Do you want to store information to submit later?",
            "afr" :  "U is nie aanlyn nie. Wil u die inligting stoor om later te registreer"
        },
        "REGISTER_INFO_STORED" : {
            "en" :"Your information has been stored",
            "afr" :  "U inligting is gestoor"
        },
        "REGISTER_INFO_CONFIRM" : {
            "en" :"Are You Sure the following is Correct?",
            "afr" : "Is u seker die volgende is korrek?"
        },
        "REGISTER_TIMEOUT" : {
            "en" :"Registration Couldn't Be Completed \nCheck Inbox For Username",
            "afr" : "Registrasie kon nie voltooi word nie \n Hou Inbox dop vir username"
        },
        "REGISTER_SUCCESS" : {
            "en" :"Registration was successful",
            "afr" : "Registrasie was suksesvol"
        },
        "REGISTER_FAIL" : {
            "en" :"Registration submission failed",
            "afr" : "Registrasie wegsending het misluk"
        },
        "CAMERA_FAIL" : {
            "en" :"Failed because:",
            "afr" : "Omdat because:"
        },
        "START_STORAGE" : {
            "en" :"Previous Information Detected.\nGo to register page?",
            "afr" : "Vorige Inligting opgetel. \nGaan na registreer bladsy?"
        },


    }

    strings.get_translation = function(data){
        var result = null
        if (language.getInfo() == 'afr'){
            if (data.afr == undefined){
                result = data.en
            }
            else {
                result = data.afr
            }
        }
        else if (language.getInfo() == 'isx'){
            if (data.isx == null){
                result = data.en
            }
            result = data.isx
        }
        else {
            result = data.en
        }
        if (result==null){
            return "NO STRING PROVIDED"
        }
        return result
    }

    return strings
}])
