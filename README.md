# register_app 

- clone repository into local directory
- in local directory open CLI and run: `npm install`

```
cordova platform add android
```
Note: if you have sdk22 installed - might need to: `cordova platform add android@4.1.1`

**Plugins to add:**
```
ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git 

ionic plugin add https://github.com/Initsogar/cordova-webintent 

cordova plugin add cordova-plugin-inappbrowser  

cordova plugin add https://github.com/sidchilling/Phonegap-SMS-reception-plugin
```

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
