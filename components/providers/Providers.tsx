'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { store } from '@/lib/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        themes={['light', 'dark']}
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
}