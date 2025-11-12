import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from "primeng/config";
import { theme } from '../theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme: {
        preset: theme,
        options: {
          darkModeSelector: ".dark-mode",
          cssLayer: {
            name: 'primeng',
            order: 'app-styles, primeng, another-css-library'
          }
        }
      }
    }),
  ]
};
