#!/bin/sh

cp -R www/res/1/android/* platforms/android/res;

#@todo if ios added ::
#cp -R www/res/1/ios/* "platforms/ios/Woluwe Shopping Magazine/Resources/"

rm -rf www/res;
rm -rf www/hooks;

sed -i '.back' 's/debuggable="true"/debuggable="false"/g' 'platforms/android/AndroidManifest.xml';

#cp -R www/res/1/ios/* "platforms/ios/Woluwe Shopping Magazine/Resources/"