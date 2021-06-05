import { ThemeProvider } from "next-themes"
import Head from "next/head"
import { AppProps } from "next/app"
import { WalletProvider } from "src/stores/wallet"

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@200;400;700&display=swap" rel="stylesheet" />
          <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
          <meta name="theme-color" content="#fff" />
        </Head>

        <Component {...pageProps} />
      </WalletProvider>
    </ThemeProvider>
  )
}

export default MyApp
