import 'reflect-metadata';

import React from 'react';
import type { AppProps } from 'next/app'

import { Provider as InversifyProvider } from 'inversify-react';
import { container } from '~/core/di/container';

const App: React.FC<AppProps> = ({
  Component,
  pageProps
}) => {
  return (
    <InversifyProvider container={container}>
      <Component {...pageProps} />
    </InversifyProvider>
  )
}

export default App;
