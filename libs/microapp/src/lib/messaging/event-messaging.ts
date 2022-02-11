
export type MessageFn<T> = (payload?: T, config?: { app?: string, type?: string }) => boolean;
export type ObserverFn<T> = (payload: T, app?: string, ev?: CustomEvent) => void;

export function payload<T>() {
  return {} as T;
}

export let MESSAGE_PREFIX = '@angular-architects/microapp@event.type:'

export function overwriteMessagePrefix(prefix: string) {
  MESSAGE_PREFIX = prefix;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createMessage<T>(type: string, app?: string, payload?: T): MessageFn<T> {
  return (payload?: T, config?: { app?: string, type?: string }) => document.dispatchEvent(new CustomEvent(
    `${ MESSAGE_PREFIX }${ config?.type || type }`,
    { detail: {
      app: config?.app || app,
      payload
    }}
  ));
}

export interface MessageListener<T> {
  subscribe: (callback: ObserverFn<T>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function messageListener<T>(type: string, app?: string, payload?: T): MessageListener<T> {
  return {
    subscribe: (callback: ObserverFn<T>) => subscribeMessage<T>(type, callback, { app })
  };
}

export function subscribeMessage<T>(type: string, callback: ObserverFn<T>, config?: { app?: string }): void {
  document.addEventListener(
    `${ MESSAGE_PREFIX }${ type }`,
    ev => ((config?.app && (ev as CustomEvent)?.detail?.app === config.app) || ! config?.app) &&
      callback(
        (ev as CustomEvent)?.detail?.payload,
        (ev as CustomEvent)?.detail?.app,
        (ev as CustomEvent)
      )
  );
}
