import React from "react"
import { Flex } from "@chakra-ui/react"
import Header from "./Header"
import { useWalletProviderStore } from "src/stores/walletProvider"
import { getLocalStorageItem } from "src/utils/storage"

const Layout: React.FC = function (properties) {
  const connectProvider = useWalletProviderStore((state) => state.connectProvider)

  React.useEffect(() => {
    const previouslyUsedWallet = getLocalStorageItem("selectedWallet")
    if (previouslyUsedWallet) {
      connectProvider(previouslyUsedWallet)
    }
  }, [connectProvider])

  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Header />
      {properties.children}
    </Flex>
  )
}

export { Layout }
