// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    development: true,
     api: 'https://localhost:7148', // local
    //api: 'https://siac-dev-backend.azurewebsites.net', // dev
    // api: 'https://siac-qa-backend.azurewebsites.net', // qa
    msal: {
        tenant: '8240321c-3525-45d8-90b2-297ae3172d96',
        client: 'dbbc04a2-bfe7-4a58-ab7e-3319da4297e8',
        redirect: 'http://localhost:4291',
        domain: 'qaLaureateLATAMMX.onmicrosoft.com', // qa
        scope: 'api://dbbc04a2-bfe7-4a58-ab7e-3319da4297e8/appi',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
