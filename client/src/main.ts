import { bootstrapApplication } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Merge the providers
const mergedProviders = [
  ...appConfig.providers,
  provideCharts(withDefaultRegisterables()),
];

// Bootstrap application with merged providers
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: mergedProviders,
}).catch((err) => console.error(err));
