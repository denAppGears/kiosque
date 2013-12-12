cd /users/denis/code/yp/kiosque/dev ;

grunt mobile-nopush --verbose ;

cd /users/denis/code/yp/kiosque/android;

phonegap create WoluweShoppingMagazine --name "WoluweShoppingMagazine" --id "com.yellowpimento.kiosque";

cd /users/denis/code/yp/kiosque/android/WoluweShoppingMagazine;

rm -Rf www;

#git clone https://github.com/denAppGears/kiosque-phonegap.git www;

cp -Rf /users/denis/code/yp/kiosque/dev/dist/tmp www

phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-splashscreen.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git
phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git

cp -R www/hooks/* .cordova/hooks

cd .cordova/hooks;

chmod -R a+x . ;

cd /users/denis/code/yp/kiosque/android/WoluweShoppingMagazine;

cordova platform add android;

#phonegap local build -V android;

cordova build android --release;
#keytool -genkey -v -keystore yellowpimento-wsc.keystore -alias wsc -keyalg RSA -keysize 2048 -validity 10000
cd platforms/android/bin;



jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/yellowpimento-wsc.keystore WoluweShoppingMagazine-release-unsigned.apk wsc

jarsigner -verify WoluweShoppingMagazine-release-unsigned.apk

zipalign -f -v 4 WoluweShoppingMagazine-release-unsigned.apk WoluweShoppingMagazine-release-signed-aligned.apk;

