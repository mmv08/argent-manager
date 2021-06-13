import React from "react"
import { ChakraProvider, cookieStorageManager } from "@chakra-ui/react"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { extendedTheme } from "./theme"

type ServerSideProperties = { cookies: string }
type Properties = React.PropsWithChildren<ServerSideProperties>

function ChakraCustomProvider({ cookies, children }: Properties): React.ReactElement {
  const colorModeManager = cookieStorageManager(cookies)

  return (
    <ChakraProvider theme={extendedTheme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  )
}

// eslint-disable-next-line unicorn/prevent-abbreviations
function getServerSideProps({ req }: GetServerSidePropsContext): GetServerSidePropsResult<ServerSideProperties> {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  }
}

export { ChakraCustomProvider, getServerSideProps }
