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

.service('checkSms', [function(){

    var app = {}
    app.checkSMSPermission =function() {

        var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');
        smsInboxPlugin.isSupported ((function(supported) {
            if(supported){}
            else
            alert("SMS not supported");
        }), function() {
            alert("Error while checking the SMS support");
        });
    }
    return app;
}])

.factory("PopupTranslate", function ($ionicPopup, $translate) {
  function getPopup(scope) {
    return $ionicPopup.show({
title: "Choose Language -- Kies Taal",
buttons: [
  { text: 'Afrikaans',
    type: 'button-calm',
    cssClass: "termspopup",
    onTap: function() {
        $translate.use('afr')
    }
},
  {
    text: 'English',
    type: 'button-positive',
    onTap: function() {
        $translate.use('en')
  }
  }
]
});
  }

  return {
      getPopup: getPopup
  };
});
