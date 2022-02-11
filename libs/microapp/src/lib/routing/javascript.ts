import { createMessage } from "../messaging";

export type PushStateArgs = [data: any, unused: string, url?: string | URL | null | undefined];

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

export const microAppRoutingState = createMessage<{ url: string }>('microAppRoutingState');
