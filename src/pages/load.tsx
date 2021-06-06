import React from "react"
import { useRouter } from "next/router"
import { Flex, Center, Input, Heading, Button, Text } from "@chakra-ui/react"
import { isArgentWallet } from "src/contracts/v2.5.0/api/walletDetector"
import { getAlchemyProvider } from "src/api/rpcProviders"
import { isValidAddress } from "src/utils/addresses"
import { isValidEnsName } from "src/utils/ens"

function LoadPage(): React.ReactElement {
  const [error, setError] = React.useState("")
  const [validating, setValidating] = React.useState(false)
  const router = useRouter()

  const onSubmit = async (event: React.FormEvent<Element>) => {
    event.preventDefault()
    setError("")
    setValidating(true)

    // @ts-expect-error we're accessing the value by input's name, but ts is not happy with it
    const walletAddress: string = event.target.elements.address.value
    try {
      const alchemyProvider = getAlchemyProvider()
      const stringIsEnsOrAddress = isValidAddress(walletAddress) || isValidEnsName(walletAddress)
      const addressIsWallet = stringIsEnsOrAddress && (await isArgentWallet(alchemyProvider, walletAddress))

      if (!addressIsWallet) {
        throw new Error("☹️")
      }

      router.push("/wallets/" + walletAddress)
    } catch (error) {
      if (error.message !== "☹️") {
        console.error(error)
      }
      setError("The address doesn't look like an Argent wallet")
    } finally {
      setValidating(false)
    }
  }

  return (
    <Center w="100vw" h="100vh">
      <Flex direction="column" flex={{ base: "0.95", md: "0.6", lg: "0.3" }} as="form" onSubmit={onSubmit}>
        <Heading as="h1" size="2xl" mb="0.5em">
          Load a wallet
        </Heading>
        <Input width="90%" name="address" variant="filled" placeholder="Address or ENS name" mb="1em" isRequired />
        <Flex align="center">
          <Button isLoading={validating} type="submit" width="30%" colorScheme="orange" mr="0.5em">
            Continue
          </Button>
          <Text color="red.400">{error}</Text>
        </Flex>
      </Flex>
    </Center>
  )
}

export default LoadPage
