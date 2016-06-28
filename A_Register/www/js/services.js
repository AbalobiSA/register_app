angular.module('app.services', [])

.service('userinfo', [function(){

    var info = {};
       return {
           getInfo: function () {
               return info;
           },
           updateInfo: function(data) {
              angular.merge(info, data);
              //alert(JSON.stringify(info))
          },
           clearInfo: function(){
            var blank = {};
              angular.copy(blank, info)
          },
           info
       };
}])

/*.service('deviceinfo', [function(){

    var device_info = {};
       return {
           getInfo: function () {
               device_info.device_manufacturer = device.manufacturer;
               device_info.device_model = device.model;
               device_info.device_platform = device.platform;
               device_info.device_version = device.version;
               device_info.device_uuid = device.uuid;
               device_info.device_serial = device.serial;
               return device_info;
           },
           device_info
       };
}])*/
