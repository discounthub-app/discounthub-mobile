// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    AppRegistry.registerComponent('main', () => Main);
    const { getStyleElement } = AppRegistry.getApplication('main');
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {getStyleElement()}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
