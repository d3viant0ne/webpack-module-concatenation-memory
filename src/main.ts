import 'zone.js/dist/zone';
import 'core-js/es7/reflect';
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from './app/app.module.ngfactory';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
  .catch(err => console.log(err));
