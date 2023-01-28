import 'reflect-metadata';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'scss-reset/_reset.scss'

import React from 'react';
import type { AppProps } from 'next/app'

import { Provider as InversifyProvider } from 'inversify-react';
import { container } from '~/core/di/container';
import { withEffector } from '~/lib/nextjs-effector/library';

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

export default withEffector(App);
