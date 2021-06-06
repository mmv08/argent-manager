import React from "react"
import { Button, ButtonProps } from "@chakra-ui/react"
import { useWalletProviderStore } from "src/stores/walletProvider"

const ConnectWalletButton = (properties: ButtonProps): React.ReactElement => {
  const [disabled, setDisabled] = React.useState(false)
  const connectProvider = useWalletProviderStore((state) => state.connectProvider)

  const handleProviderConnect = React.useCallback(async () => {
    setDisabled(true)

    try {
      await connectProvider()
    } catch (error) {
      console.error(error)
    } finally {
      setDisabled(false)
    }
  }, [connectProvider])

  return (
    <Button
      color="primary"
      type="button"
      onClick={handleProviderConnect}
      variant="contained"
      disabled={disabled}
      {...properties}
    >
      Connect
    </Button>
  )
}

export { ConnectWalletButton }
