// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native';
import React from 'react';
import App from '../App'; // <-- импортируем настоящий App

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Регистрируем App как корневой компонент
    AppRegistry.registerComponent('main', () => App);
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
      <Html lang="ru">
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
