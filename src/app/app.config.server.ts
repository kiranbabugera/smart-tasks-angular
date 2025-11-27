import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering() // <--- This is the key line fixing your error
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);