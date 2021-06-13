import { Flex, Heading, Text } from "@chakra-ui/react"
import { Identicon } from "src/components/Identicon"
import { shortenText } from "src/utils/strings"

type Properties = {
  ens?: string
  address: string
}

function WalletCard({ address, ens }: Properties): React.ReactElement {
  const shortAddress = shortenText(address, 6, 4)
  const primaryText = ens || shortAddress

  return (
    <Flex direction="column" align="center">
      <Identicon address={address} mb={4} size="xl" />
      <Heading as="h4" size="lg">
        {primaryText}
      </Heading>
      <Text color="gray.500">{address}</Text>
    </Flex>
  )
}

export { WalletCard }
