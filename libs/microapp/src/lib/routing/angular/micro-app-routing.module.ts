import { LocationStrategy } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { UrlHandlingStrategy } from "@angular/router";
import { MicroAppLocationStrategy } from "./micro-app-location-strategy";
import { MICRO_APP_NAME, MICRO_APP_SHELL } from "./micro-app-name.token";
import { MicroAppRoutingState } from "./micro-app-routing-state";
import { MicroAppUrlHandlingStrategy } from "./micro-app-url-handling-strategy";

export interface MicroAppRoutingConfig {
  name: string;
}

@NgModule({})
export class MicroAppRoutingModule {
  constructor(private microAppRoutingState: MicroAppRoutingState) {}

  static forShell(config: MicroAppRoutingConfig): ModuleWithProviders<MicroAppRoutingModule> {
    return {
      ngModule: MicroAppRoutingModule,
      providers: [
        MicroAppRoutingModule.getDefaultProviders(config, true)
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

  private static getDefaultProviders(config: MicroAppRoutingConfig, isShell: boolean = false) {
    return [
      { provide: MICRO_APP_NAME, useValue: config.name },
      { provide: UrlHandlingStrategy, useClass: MicroAppUrlHandlingStrategy },
      { provide: LocationStrategy, useClass: MicroAppLocationStrategy },
      { provide: MICRO_APP_SHELL, useValue: isShell },
      MicroAppRoutingState
    ];
  }
}
