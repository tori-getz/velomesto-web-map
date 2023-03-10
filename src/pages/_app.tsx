import 'react-toastify/dist/ReactToastify.css';
import 'react-image-gallery/styles/css/image-gallery.css'
import 'react-modern-drawer/dist/index.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'scss-reset/_reset.scss'

import React from 'react';
import type { AppProps } from 'next/app'

import { Provider as InversifyProvider } from 'inversify-react';
import { container } from '~/core/di/container';
import { ToastContainer } from 'react-toastify';

const App: React.FC<AppProps> = ({
  Component,
  pageProps
}) => {
  return (
    <InversifyProvider container={container}>
      <ToastContainer />
      <Component {...pageProps} />
    </InversifyProvider>
  )
}

export default App;
