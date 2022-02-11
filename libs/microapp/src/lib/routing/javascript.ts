import { createMessage } from "../messaging";


export type ReplacePushStateArgs = [data: any, unused: string, url?: string | URL | null | undefined];


/**
 * history.pushState
 */
export const originalPushStateFn = history.pushState.bind(history);

export function pushEventPushStateFn(...args: unknown[]): void {
  createMessage<{ pushStateArgs: unknown[] }>('routerPushState')({
    pushStateArgs: args
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function patchPushState(fn?: (...args: unknown[]) => void, config?: { overwrite: boolean }): void {
  history.pushState = (...args) => {
    fn?.(...args)
    config?.overwrite !== true && originalPushStateFn(...args);
  };
}


/**
 * history.replaceState
 */
export const originalReplaceStateFn = history.replaceState.bind(history);

export function replaceEventReplaceStateFn(...args: unknown[]): void {
  createMessage<{ replaceStateArgs: unknown[] }>('routerReplaceState')({
    replaceStateArgs: args
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function patchReplaceState(fn?: (...args: unknown[]) => void, config?: { overwrite: boolean }): void {
  history.replaceState = (...args) => {
    fn?.(...args)
    config?.overwrite !== true && originalReplaceStateFn(...args);
  };
}


export function deeplinkEvent(microApp: string, url: string): void {
  createMessage<{ url: string }>('microappDeeplink', microApp)({ url });
}
