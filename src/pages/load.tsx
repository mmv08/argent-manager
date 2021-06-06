import React from "react"
import { Flex, Center, Input, Heading, Button } from "@chakra-ui/react"
import { isArgentWallet } from "src/contracts/v2.5.0/api/walletDetector"
import { getAlchemyProvider } from "src/api/rpcProviders"

function LoadPage(): React.ReactElement {
  const [error, setError] = React.useState("")

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault()

    // @ts-expect-error we're accessing the value by input's name, but ts is not happy with it
    const walletAddress: string = event.target.address.value
    const alchemyProvider = getAlchemyProvider()
    const addressIsWallet = await isArgentWallet(alchemyProvider, walletAddress)
    if (!addressIsWallet) {
      setError("The address doesn't look like an Argent wallet")
      return
    }

    console.log("Cool, its a wallet")
  }

  return (
    <Center w="100vw" h="100vh">
      <Flex direction="column" flex={{ base: "0.95", md: "0.6", lg: "0.3" }} as="form" onSubmit={onSubmit}>
        <Heading as="h1" size="2xl" mb="0.5em">
          Load a wallet
        </Heading>
        <Input width="80%" name="address" variant="filled" placeholder="Address or ENS name" mb="1em" isRequired />
        <Button type="submit" width="30%" colorScheme="orange">
          Continue
        </Button>
      </Flex>
    </Center>
  )
}

export default LoadPage
