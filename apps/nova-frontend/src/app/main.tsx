import './index.css';
import { StrictMode } from 'react';
import './style.css';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { MantineProvider } from '@mantine/core';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mantineTheme } from '@shared/styles/mantine';
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider
        stylesTransform={emotionTransform}
        theme={mantineTheme}
        defaultColorScheme="dark"
      >
        <QueryClientProvider client={queryClient}>
          <MantineEmotionProvider>
            <RouterProvider router={router} />
          </MantineEmotionProvider>
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}
