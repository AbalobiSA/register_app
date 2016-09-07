angular.module('app.strings', [])

.service('strings', ['language', function(language){


    var strings = {

        "HOME_SELECT_HEADING" : "Select Language -- Kies Taal",
        "HOME_CLEAR": {
            "en" : "All information has been cleared",
            "afr" :"Alle informasie is nou uitgevee"
        },
        "HOME_NO_CONNECTION" : {
            "en" :"You currently have no internet connection.\nYou will need to connect to the internet to be able to register.",
            "afr" :  "U het tans nie internet toegang nie.\nU sal aan die internet moet koppel om te kan registreer."
        },
        "REGISTER_OFFLINE" : {
            "en" :"You currently have no internet connection.\nDo you want to save your information to submit later?",
            "afr" :  "U het tans nie internet toegang nie.\nWil u die inligting stoor om later te kan registreer?"
        },
        "REGISTER_INFO_STORED" : {
            "en" :"Your information has been saved.",
            "afr" :  "U inligting is gestoor."
        },
        "REGISTER_INFO_CONFIRM" : {
            "en" :"Please confirm - is all this information correct?",
            "afr" : "Bevestig asseblief - is hierdie inligting korrek?"
        },
        "REGISTER_TIMEOUT" : {
            "en" :"Registration timeout - confirmation SMS not received yet.\nPlease watch your SMS Inbox for the confirmation SMS. Please contact the Abalobi team if no SMS is received within 24 hours.",
            "afr" : "Registrasie timeout - registrasie SMS nog nie ontvang nie.\nHou asb u SMS Inbox dop vir die registrasie SMS. Kontak asseblief die Abalobi span indien u nie binne 24uur 'n SMS ontvang nie.'"
        },
        "REGISTER_SUCCESS" : {
            "en" :"Registration SMS received - your registration was submitted.",
            "afr" : "Registrasie SMS ontvang - u registrasie is ingedien."
        },
        "REGISTER_FAIL" : {
            "en" :"Registration submission failed.",
            "afr" : "Stuur van registrasie inligting het misluk."
        },
        "CAMERA_FAIL" : {
            "en" :"Failure reason:",
            "afr" : "Mislukking rede:"
        },
        "START_STORAGE" : {
            "en" :"Saved information was found and have been loaded. Click 'Clear info' to clear the registration info on your device.",
            "afr" : "Gestoorde inligting is gevind en gelaai. Gebruik 'Vee inligting uit' om die registrasie inligting op u foon/tablet uit te wis."
        }
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
