# Abalobi Register App

This app is used for fishers etc to register themselves once-off with Abalobi.

-----
### Getting Started

Clone the repo:

    $ git clone https://github.com/AbalobiSA/register_app.git
    $ cd register_app

In local directory, open CLI and run:

    $ npm install -g yarn
    $ yarn

Add android as a platform in cordova.
```
cordova platform add android
```
To Build, open the SDK manager within android studio and install
- Android SDK v16
- Android SDK v22

Note: if you have sdk22 installed - might need:

    $ cordova platform add android@4.1.1

If you run into any problems, remove android target from ionic:

    $ cordova platform remove android
    $ cordova platform add android@4.1.1

**Plugins to add:**
```
ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git
ionic plugin add https://github.com/Initsogar/cordova-webintent
cordova plugin add cordova-plugin-inappbrowser  
cordova plugin add https://github.com/sidchilling/Phonegap-SMS-reception-plugin
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-device
cordova plugin add --save cordova-plugin-console
cordova plugin add cordova-plugin-network-information
cordova plugin add https://github.com/apache/cordova-plugin-compat
cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
```
Short command for cygwin users:

    $ ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git && ionic plugin add https://github.com/Initsogar/cordova-webintent && cordova plugin add cordova-plugin-inappbrowser && cordova plugin add --save cordova-plugin-console && cordova plugin add https://github.com/sidchilling/Phonegap-SMS-reception-plugin && cordova plugin add cordova-plugin-camera && cordova plugin add cordova-plugin-device && cordova plugin add cordova-plugin-splashscreen && cordova plugin add cordova-plugin-network-information && cordova plugin add https://github.com/apache/cordova-plugin-compat && cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git

**To check plugins installed (should list above plugins):**
```
cordova plugins ls
```
**To deploy app to phone or emulator**
```
ionic run android
```
**To deploy to browser**
```
ionic serve
```

-----------
### Building

[Follow this guide](https://ionicframework.com/docs/guide/publishing.html)

Add these to build.gradle:
```
android {
  lintOptions {
    abortOnError false
  }
}
```
