import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy, PlatformLocation } from "@angular/common";
import { Inject, Injectable, Optional } from "@angular/core";
import { MICRO_APP_NAME } from "./micro-app-name.token";

@Injectable()
export class MicroAppLocationStrategy extends PathLocationStrategy implements LocationStrategy {
  constructor(
    platformLocation: PlatformLocation,
    @Inject(MICRO_APP_NAME) private microAppName: string,
    @Optional() @Inject(APP_BASE_HREF) href?: string) {

    super(platformLocation, href);
  }
  override pushState(state: any, title: string, url: string, queryParams: string): void {
    super.pushState({ ...state, microApp: this.microAppName }, title, url, queryParams);
  }

  override replaceState(state: any, title: string, url: string, queryParams: string): void {
    super.replaceState({ ...state, microApp: this.microAppName }, title, url, queryParams);
  }
}
