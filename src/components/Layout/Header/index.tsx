import React from "react"
import Link from "next/link"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Flex, Text, TextProps, Heading, Button } from "@chakra-ui/react"
import { ConnectWalletButton } from "src/components/ConnectWalletButton"
import { useWalletProviderStore } from "src/stores/walletProvider"
import { shortenText } from "src/utils/strings"

type NavItemProperties = {
  children: React.ReactChild
  isLast?: boolean
} & TextProps

function NavItem(properties: NavItemProperties) {
  const { children, isLast, ...rest } = properties
  return (
    <Text mb={{ base: isLast ? 0 : 8, sm: 0 }} mr={{ base: 0, sm: isLast ? 0 : 8 }} display="block" {...rest}>
      {children}
    </Text>
  )
}

function Header(): React.ReactElement {
  const [show, setShow] = React.useState(false)
  const toggleMenu = () => setShow(!show)
  const [account] = useWalletProviderStore((state) => [state.account])

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["black", "black", "transparent", "transparent"]}
      color={["white", "white", "black", "black"]}
    >
      <Flex align="center">
        <Heading as="h6" size="lg">
          <Link href="/">Wallet Manager</Link>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu} as="button">
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box display={{ base: show ? "block" : "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }} as="nav">
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <NavItem>
            <Link href="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link href="/load">Load</Link>
          </NavItem>
          <NavItem isLast>
            {account ? (
              <Button size="sm" rounded="md" colorScheme="orange">
                {shortenText(account, 6, 4)}
              </Button>
            ) : (
              <ConnectWalletButton size="sm" rounded="md" colorScheme="orange">
                Connect a wallet
              </ConnectWalletButton>
            )}
          </NavItem>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
