angular.module('app.services', [])

.factory('userinfo', [function(){

    var userinfo = {};
    var info = {}

    userinfo.getInfo =  function () {
        return info;
    }

    userinfo.updateInfo = function(data) {
        angular.merge(info, data);
        //alert(JSON.stringify(info))
        return info;
    }

    userinfo.clearInfo = function(){
        var blank = {};
        //info = blank
        info = angular.copy(blank,info)
        //alert(JSON.stringify(info))
        //return info
    }

    return userinfo

}])

.service('language', [function(){

    var language = {};
    var current_lang = "en"

    language.getInfo =  function () {
        return current_lang;
    }
    language.updateInfo = function(data) {
        current_lang = data
        return current_lang;
    }

    return language
}])


.service('checkSms', [function(){

    var app = {}
    app.checkSMSPermission =function() {

        var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');
        smsInboxPlugin.isSupported ((function(supported) {
            if(supported){}
            else
            alert("SMS not supported. \n Please Check Inbox");
        }), function() {
            alert("Error while checking the SMS support");
        });
    }
    return app;
}])

.service('Storage', [function($localStorage, userinfo){

    var app = {}
    app.store =function() {

        var confirm = window.confirm("Offline Store?")
        if (confirm == true){
            $localStorage.user = angular.copy(userinfo.getInfo());
            alert("Information has been stored")
        }
    }
    app.clear = function(){
        $localStorage.$reset()
    }
    return app;
}])

.factory("PopupTranslate",  function ($ionicPopup, language, $translate, $localStorage) {

    var title = "Select Language -- Kies Taal"

    function getPopup(scope) {
        return $ionicPopup.show({
            title: title,
            buttons: [
                { text: 'AFR',
                type: 'button-calm',
                cssClass: "termspopup",
                onTap: function() {
                    $translate.use('afr')
                    language.updateInfo("afr");
                    $localStorage.language = "afr"
                }
            },
            { text: 'XH',
            type: 'button-stable',
            cssClass: "termspopup",
            onTap: function() {
                $translate.use('xh')
                language.updateInfo("xh");
                $localStorage.language = "xh"
            }
        },
            {
                text: 'ENG',
                type: 'button-positive',
                onTap: function() {
                    $translate.use('en')
                    language.updateInfo("en")
                    $localStorage.language = "en"
                }
            }
        ]
    });
}

return {
    getPopup: getPopup
};
});
