import { LocationStrategy } from "@angular/common";
import { ModuleWithProviders, NgModule, Optional } from "@angular/core";
import { UrlHandlingStrategy } from "@angular/router";
import { patchPushState, pushEventPushStateFn } from '../javascript';
import { MicroAppLocationStrategy } from "./micro-app-location-strategy";
import { MICRO_APP_NAME } from "./micro-app-name.token";
import { MicroAppRoutingState } from "./micro-app-routing-state";
import { MicroAppUrlHandlingStrategy } from "./micro-app-url-handling-strategy";

export interface MicroAppRoutingConfig {
  name: string;
}

@NgModule({})
export class MicroAppRoutingModule {
  constructor(@Optional() private microAppRoutingState: MicroAppRoutingState) {}

  static forShell(config: MicroAppRoutingConfig): ModuleWithProviders<MicroAppRoutingModule> {
    patchPushState(pushEventPushStateFn, { overwrite: true });

    return {
      ngModule: MicroAppRoutingModule,
      providers: [
        MicroAppRoutingModule.getDefaultProviders(config),
        MicroAppRoutingState
      ]
    };
  }

  static forMicroApp(config: MicroAppRoutingConfig): ModuleWithProviders<MicroAppRoutingModule> {
    return {
      ngModule: MicroAppRoutingModule,
      providers: [
        MicroAppRoutingModule.getDefaultProviders(config)
      ]
    };
  }

  private static getDefaultProviders(config: MicroAppRoutingConfig) {
    return [
      { provide: MICRO_APP_NAME, useValue: config.name },
      { provide: UrlHandlingStrategy, useClass: MicroAppUrlHandlingStrategy },
      { provide: LocationStrategy, useClass: MicroAppLocationStrategy }
    ];
  }
}
