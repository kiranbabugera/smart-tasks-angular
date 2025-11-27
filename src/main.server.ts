import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server'; // Imports from step 1

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;