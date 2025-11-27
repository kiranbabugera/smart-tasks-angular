import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// remove the import for provideClientHydration if it's there

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
    // provideClientHydration()  <-- DELETE OR COMMENT OUT THIS LINE
  ]
};