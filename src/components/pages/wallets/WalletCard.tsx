import { Flex, Heading, Text, useBreakpointValue, Button } from "@chakra-ui/react"
import { CopyIcon, LinkIcon } from "@chakra-ui/icons"

import { Identicon } from "src/components/Identicon"
import { shortenText } from "src/utils/strings"

type Properties = {
  ens?: string
  address: string
}

function WalletCard({ address, ens }: Properties): React.ReactElement {
  const displayAddress = useBreakpointValue({ base: shortenText(address, 10, 10), md: address })
  const primaryText = ens || displayAddress

  return (
    <Flex direction="column" align="center">
      <Identicon address={address} mb={4} size="xl" />
      <Heading as="h4" size="lg" mb={1}>
        {primaryText}
      </Heading>
      {ens && <Text color="gray.500">{displayAddress}</Text>}
      <Flex mt={3}>
        <Button leftIcon={<CopyIcon />} variant="link">
          Copy
        </Button>
        <Button leftIcon={<LinkIcon />} variant="link" as="p" ml={3}>
          <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noreferrer">
            Etherscan
          </a>
        </Button>
      </Flex>
    </Flex>
  )
}

export { WalletCard }
