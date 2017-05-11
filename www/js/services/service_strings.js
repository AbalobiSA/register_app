angular.module('app.strings', [])

.service('strings', ['language', function(language){


    var strings = {
        "HOME_SELECT_HEADING" : "Select Language -- Kies Taal",
        "HOME_CLEAR": {
            "en" : "All information has been cleared",
            "afr" :"Alle informasie is nou uitgevee",
            "xh" : "",
            "zu" : ""
        },
        "HOME_NO_CONNECTION" : {
            "en" :"You currently have no internet connection.\nYou will need to connect to the internet to be able to register.",
            "afr" :  "U het tans nie internet toegang nie.\nU sal aan die internet moet koppel om te kan registreer.",
            "xh" : "",
            "zu" : ""
        },
        "REGISTER_OFFLINE" : {
            "en" :"You currently have no internet connection.\nDo you want to save your information to submit later?",
            "afr" :  "U het tans nie internet toegang nie.\nWil u die inligting stoor om later te kan registreer?",
            "xh" : "",
            "zu" : ""
        },
        "REGISTER_INFO_STORED" : {
            "en" :"Your information has been saved.",
            "afr" :  "U inligting is gestoor.",
            "xh" : "",
            "zu" : ""
        },
        "REGISTER_INFO_CONFIRM" : {
            "en" :"Please confirm - is all this information correct?",
            "afr" : "Bevestig asseblief - is hierdie inligting korrek?",
            "xh" : "",
            "zu" : ""
        },
        "REGISTER_TIMEOUT" : {
            "en" :"Take note: The SMS to confirm your registration has not been received yet.\nPlease watch your SMS Inbox for the confirmation SMS. Please contact the Abalobi team if no SMS is received within 24 hours. Contact details are on the Abalobi website.",
            "afr" : "Neem asseblief kennis: Die SMS om u registrasie te bevestig is nog nie ontvang nie.\nHou asb u SMS posbus dop vir hierdie SMS. Kontak asseblief die Abalobi span indien u nie binne 24 uur hierdie SMS ontvang nie. Kontak besonderhede is op die Abalobi webtuiste beskikbaar.",
            "xh" : "",
            "zu" : ""
        },
        "REGISTER_SUCCESS" : {
            "en" :"Your registration has been submitted. You should receive a confirmation SMS within a minute or two.",
            "afr" : "U registrasie word ingedien. U behoort binne 'n minuut of twee 'n bevestigings SMS te ontvang.",
            "xh" : "",
            "zu" : ""
        },
        "REGISTER_FAIL" : {
            "en" :"Registration submission failed. Please try again. Please contact the Abalobi team if the problem persists.",
            "afr" : "Stuur van registrasie inligting het misluk. Probeer asseblief weer. Kontak asb die Abalobi span indien die probleem aanhou.",
            "xh" : "",
            "zu" : ""
        },
        "CAMERA_FAIL" : {
            "en" :"Failure reason:",
            "afr" : "Mislukking rede:",
            "xh" : "",
            "zu" : ""
        },
        "START_STORAGE" : {
            "en" :"Saved information was found and have been loaded. Click 'Clear info' to clear the registration info on your device.",
            "afr" : "Gestoorde inligting is gevind en gelaai. Gebruik 'Vee inligting uit' om die registrasie inligting op u foon/tablet uit te wis.",
            "xh" : "",
            "zu" : ""
        },
        "COOP_UPDATE_DATA" : {
            "en" : "Getting new Co-op data. Please wait...",
            "afr" : "Kry nuwe inligting, wag asseblief...",
            "xh" : "",
            "zu" : ""
        },
        "UPLOAD_CONNECTION_ERROR" : {
            "en" : "Unable to submit your forms. Please check your network settings and try again.",
            "afr" : "Kon nie u vorms stuur nie. Maak asseblief seker u netwerk verstellings is reg en probeer weer.",
            "xh" : "",
            "zu" : ""
        },
        "UPLOAD_PIPELINE_ERROR" : {
            "en" : "REPLACE_ME",
            "afr" : "REPLACE_ME",
            "xh" : "",
            "zu" : ""
        },
        "UPDATE_CONNECTION_ERROR" : {
            "en" : "Unable to check for updates. \nPlease check your network settings.",
            "afr" : "Kon nie toets of daar nuwe weergawes beskikbaar is nie. \nMaak asseblief seker u netwerk verstellings is reg.",
            "xh" : "",
            "zu" : ""
        },
        "UPDATE_NOT_NECESSARY" : {
            "en" : "You currently have the latest version of the app.",
            "afr" : "U het klaar die nuutste weergawe van die app.",
            "xh" : "",
            "zu" : ""
        },
        "UPDATE_AVAILABLE" : {
            "en" : "There is an update available on the Play Store!",
            "afr" : "Daar is 'n nuwe weergawe (update) beskikbaar op die Play Store!",
            "xh" : "",
            "zu" : ""
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
        else if (language.getInfo() === 'xh'){
            if (data.xh === null){
                result = data.en
            }
            result = data.xh
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
