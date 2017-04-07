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
            "en" :"Take note: The SMS to confirm your registration has not been received yet.\nPlease watch your SMS Inbox for the confirmation SMS. Please contact the Abalobi team if no SMS is received within 24 hours. Contact details are on the Abalobi website.",
            "afr" : "Neem asseblief kennis: Die SMS om u registrasie te bevestig is nog nie ontvang nie.\nHou asb u SMS posbus dop vir hierdie SMS. Kontak asseblief die Abalobi span indien u nie binne 24 uur hierdie SMS ontvang nie. Kontak besonderhede is op die Abalobi webtuiste beskikbaar."
        },
        "REGISTER_SUCCESS" : {
            "en" :"Your registration has been submitted. You should receive a confirmation SMS within a minute or two.",
            "afr" : "U registrasie word ingedien. U behoort binne 'n minuut of twee 'n bevestigings SMS te ontvang."
        },
        "REGISTER_FAIL" : {
            "en" :"Registration submission failed. Please try again. Please contact the Abalobi team if the problem persists.",
            "afr" : "Stuur van registrasie inligting het misluk. Probeer asseblief weer. Kontak asb die Abalobi span indien die probleem aanhou."
        },
        "CAMERA_FAIL" : {
            "en" :"Failure reason:",
            "afr" : "Mislukking rede:"
        },
        "START_STORAGE" : {
            "en" :"Saved information was found and have been loaded. Click 'Clear info' to clear the registration info on your device.",
            "afr" : "Gestoorde inligting is gevind en gelaai. Gebruik 'Vee inligting uit' om die registrasie inligting op u foon/tablet uit te wis."
        },
        "COOP_UPDATE_DATA" : {
            "en" : "Getting new Co-op data. Please wait...",
            "afr" : "Kry nuwe inligting, wag asseblief..."
        },
        "UPLOAD_CONNECTION_ERROR" : {
            "en" : "Unable to submit your forms. Please check your network settings and try again.",
            "afr" : "Unable to submit your forms. Please check your network settings and try again."
        },
        "UPLOAD_PIPELINE_ERROR" : {
            "en" : "REPLACE_ME",
            "afr" : "REPLACE_ME"
        },
        "UPDATE_CONNECTION_ERROR" : {
            "en" : "Unable to check for updates. \nPlease check your network settings.",
            "afr" : "Unable to check for updates. \nPlease check your network settings."
        },
        "UPDATE_NOT_NECESSARY" : {
            "en" : "You currently have the latest version of the app.",
            "afr" : "You currently have the latest version of the app."
        },
        "UPDATE_AVAILABLE" : {
            "en" : "There is an update available on the play store!",
            "afr" : "There is an update available on the play store!"
        }
    };

    strings.get_translation = function(data){
        var result = null;
        if (language.getInfo() === 'afr'){
            if (data.afr === undefined){
                result = data.en
            }
            else {
                result = data.afr
            }
        }
        else if (language.getInfo() === 'isx'){
            if (data.isx === null){
                result = data.en
            }
            result = data.isx
        }
        else {
            result = data.en
        }
        if (result===null){
            return "NO STRING PROVIDED";
        }
        return result;
    };

    return strings
}]);
