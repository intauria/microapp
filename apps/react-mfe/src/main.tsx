import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { customHistory, CustomRouter } from './custom-router';

const root = ReactDOM.createRoot(
  document.getElementById('mfe-react') as HTMLElement
);
root.render(
  <BrowserRouter>
    <CustomRouter history={customHistory} microApp={'mfe-react'}>
      <App />
    </CustomRouter>
  </StrictMode>
);
