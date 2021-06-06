import { Box } from "@chakra-ui/react"
import { ConnectWalletButton } from "src/components/ConnectWalletButton"

function Header(): React.ReactElement {
  return (
    <Box as="header">
      <ConnectWalletButton />
    </Box>
  )
}

export default Header
