import { Inject, Injectable, Optional } from "@angular/core";
import { Router } from "@angular/router";
import { messageListener } from "../../messaging/event-messaging";
import {
  originalPushStateFn,
  originalReplaceStateFn,
  patchPushState,
  patchReplaceState,
  pushEventPushStateFn,
  replaceEventReplaceStateFn,
  ReplacePushStateArgs
} from "../javascript";
import { MICRO_APP_NAME, MICRO_APP_SHELL } from "./micro-app-name.token";

@Injectable()
export class MicroAppRoutingState {
  urlState: Record<string, string> = {};

  constructor(
    private router: Router,
    @Inject(MICRO_APP_NAME) private microAppName: string,
    @Optional() @Inject(MICRO_APP_SHELL) private isShell: boolean) {

    patchPushState(pushEventPushStateFn, { overwrite: true });
    patchReplaceState(replaceEventReplaceStateFn, { overwrite: true });
    this.isShell && this.manageAddressBar();
    this.initDeeplinkNavigation();
  }

  private urlStateToString(): string {
    const composedUrl = Object.keys(this.urlState).reduce((acc, cur) => {
      acc && (acc = acc + '//');
      acc = `${ acc }${ cur }:${ this.urlState[cur] }`;
      return acc;
    }, '');
    return `(${ composedUrl })`;
  }

  private updateHistoryState(args: ReplacePushStateArgs, fn: (...args: ReplacePushStateArgs) => void): void {
    const [{ microApp },, url] = args;
    microApp && url && (this.urlState[microApp] = url.toString().slice(1));
    const newUrl = this.urlStateToString();
    // console.log(microApp, url, newUrl);
    args[2] = newUrl;
    fn(...args);
  }

  private manageAddressBar(): void {
    messageListener<{ pushStateArgs: ReplacePushStateArgs }>(
      'routerPushState'
    ).subscribe(({ pushStateArgs: args }: { pushStateArgs: ReplacePushStateArgs }) => {
      this.updateHistoryState(args, originalPushStateFn);
    });

    messageListener<{ replaceStateArgs: ReplacePushStateArgs }>(
      'routerReplaceState'
    ).subscribe(({ replaceStateArgs: args }: { replaceStateArgs: ReplacePushStateArgs }) => {
      this.updateHistoryState(args, originalReplaceStateFn);
    });
  }

  private initDeeplinkNavigation(): void {
    messageListener<{ url: string }>('microappDeeplink', this.microAppName)
      .subscribe(({url}) => this.router.navigateByUrl(url));
  }
}
