import type { AppProps } from 'next/app';
import Router from 'next/router';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

// dev fix for css loader
if (process.env.NODE_ENV !== 'production') {
  Router.events.on('routeChangeComplete', () => {
    const path = '/_next/static/css/styles.chunk.css';
    const chunksSelector = `link[href*="${path}"]`;
    const chunksNodes: any = document.querySelectorAll(chunksSelector);
    const timestamp = new Date().valueOf();
    chunksNodes[0].href = `${path}?${timestamp}`;
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
