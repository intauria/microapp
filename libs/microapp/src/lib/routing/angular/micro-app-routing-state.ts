import { Injectable } from "@angular/core";
import { PushStateArgs } from "..";
import { messageListener } from "../../messaging/event-messaging";
import { originalPushStateFn } from "../javascript";

@Injectable()
export class MicroAppRoutingState {
  urlState: Record<string, string> = {};

  constructor() {
    messageListener<{ pushStateArgs: PushStateArgs }>(
      'routerPushState'
    ).subscribe(({ pushStateArgs: args }: { pushStateArgs: PushStateArgs }) => {
      const [{ microApp },, url] = args;
      microApp && url && (this.urlState[microApp] = url.toString().slice(1));
      const newUrl = this.urlToString();
      // console.log(microApp, url, newUrl);
      args[2] = newUrl;
      originalPushStateFn(...args);
    });
  }

  urlToString(): string {
    const composedUrl = Object.keys(this.urlState).reduce((acc, cur) => {
      acc && (acc = acc + '//');
      acc = `${ acc }${ cur }:${ this.urlState[cur] }`;
      return acc;
    }, '');
    return `(${ composedUrl })`;
  }
}
