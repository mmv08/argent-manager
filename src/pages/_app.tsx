import { ThemeProvider } from "next-themes"
import Head from "next/head"
import { AppProps } from "next/app"
import { ChakraCustomProvider, getServerSideProps } from "src/styles/ChakraCustomProvider"
import { WalletProvider } from "src/stores/walletProvider"
import { Layout } from "src/components/Layout"

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ThemeProvider>
      <ChakraCustomProvider>
        <WalletProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="utf-8" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Barlow:wght@200;400;700&display=swap"
              rel="stylesheet"
            />
            <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
            <meta name="theme-color" content="#fff" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WalletProvider>
      </ChakraCustomProvider>
    </ThemeProvider>
  )
}

export { getServerSideProps }

export default MyApp
