import { createMemoryHistory} from 'history';
import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

export const customHistory = createMemoryHistory();

function getComposedUrl(microApp: string, url: string): string | undefined {
  const urls = url.match(/\((.*)\)/)?.[1];
  if (!urls) {
    return url;
  }
  const mfeUrl = urls && urls
    	?.split('//')
      .map(u => u.split(':'))
      .filter(([app, path]) => {
        if (app === microApp) {
          pushAppState(microApp, [{ microApp: microApp }, null, path]);
          return true;
        }
        deeplink(app, path);
        return false;
      })
      .map(([, path]) => path)[0];
  return mfeUrl ? `/${mfeUrl}` : undefined;
}

const MESSAGE_PREFIX = '@angular-architects/microapp@event.type:';
const MESSAGE_DEEPLINK = MESSAGE_PREFIX + 'microappDeeplink';
const MESSAGE_PUSH_STATE = MESSAGE_PREFIX + 'routerPushState';

function deeplink(app: string, url: string) {
  document.dispatchEvent(new CustomEvent(
    MESSAGE_DEEPLINK,
    { detail: {
      app,
      payload: { url }
    }}
  ));
}

function pushAppState(app: string, pushStateArgs: any) {
  document.dispatchEvent(new CustomEvent(
    MESSAGE_PUSH_STATE,
    { detail: {
      app,
      payload: { pushStateArgs }
    }}
  ));
}

function listenToDeeplinks(app: string) {
  document.addEventListener(
    MESSAGE_DEEPLINK,
    ev => {
      if ((ev as CustomEvent)?.detail?.app === app) {
        processPath({
          action: 'PUSH',
          location: {
            pathname: '/' + (ev as CustomEvent)?.detail.payload.url
          }
        });
        pushAppState(app, [{ microApp: app }, null, (ev as CustomEvent)?.detail.payload.url]);
      }
    }
  );
}

const processPathFactory = (setState: any, app: string) => (args: any) => {
  const {location: { pathname: path}} = args;
  const route = getComposedUrl(app, path);
  if (route) {
    const args_out = {
      ...args,
      location: {
        ...args.location,
        pathname: route
      }
    };
    setState(args_out);
  }
}

let processPath: any;

export const CustomRouter = ({ history, microApp, ...props }: any) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  processPath = processPathFactory(setState, microApp);
  listenToDeeplinks(microApp);

  useLayoutEffect(() => history.listen((args: any) => {
    processPath(args);
  }), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};
