import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import flush from 'styled-jsx/server';
import { configureLoadStyles } from '@microsoft/load-themed-styles';
import { renderStatic } from 'glamor/server';
import 'babel-polyfill';

let _allStyles = '';
configureLoadStyles((styles) => {
  _allStyles += styles;
});

export default class PSKDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = flush();
    const gStyles = renderStatic(() => page.html);

    return { ...page, styles, ...gStyles };
  }

  render() {
    return (
      <Html>
        <Head>
          <style id="glamor-styles" dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <style id="fabric-styles" dangerouslySetInnerHTML={{ __html: _allStyles }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
