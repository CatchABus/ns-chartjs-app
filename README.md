This app demonstrates how to use chart.js in NativeScript apps.
Since chart.js needs `Intl` for certain operations, we needed the following polyfills:

- @formatjs/intl-getcanonicallocales
- @formatjs/intl-locale
- @formatjs/intl-numberformat
- @formatjs/intl-pluralrules