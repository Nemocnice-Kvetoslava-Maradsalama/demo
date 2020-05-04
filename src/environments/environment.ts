// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const urls = {
  personnel: 'http://personnel-svc.nirvash.uhri.nevesnican.cz:8111',
  patient: 'http://patient-svc.nirvash.uhri.nevesnican.cz:8111',
  drugs: 'http://drugs-svc.nirvash.uhri.nevesnican.cz:8111',
  disease: 'http://disease-svc.nirvash.uhri.nevesnican.cz:8111'
};

export const environment = {
  production: false,
  serviceUrls: urls
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
