import Document, { Head, Html, Main, NextScript } from 'next/document'

class OverrideDocument extends Document {
  render() {
    return (
      <Html lang="zh-Hant">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default OverrideDocument
