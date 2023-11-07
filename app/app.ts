/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application } from '@nativescript/core';
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import "@formatjs/intl-numberformat/polyfill";

// Locale data for en
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-numberformat/locale-data/en";

(global as any).window = {
  requestAnimationFrame(callback) {
    return global.requestAnimationFrame(callback);
  }
};

Application.run({ moduleName: 'app-root' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
