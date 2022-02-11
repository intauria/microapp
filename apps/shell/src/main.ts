import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { FirstAppModule } from './first-app/app.module';
import { SecondAppModule } from './second-app/app.module';


if (environment.production) {
  enableProdMode();
}

const plattform = platformBrowserDynamic();

plattform.bootstrapModule(FirstAppModule)
  .catch((err) => console.error(err));

plattform.bootstrapModule(SecondAppModule)
  .catch((err) => console.error(err));
