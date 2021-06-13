import React from "react"
import Link from "next/link"
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Box, Flex, Text, TextProps, Heading, Button, useColorMode, useBoolean } from "@chakra-ui/react"
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
    <Text mb={{ base: isLast ? 0 : 8, sm: 8, md: 0 }} mr={{ base: 0, sm: isLast ? 0 : 8 }} display="block" {...rest}>
      {children}
    </Text>
  )
}

function Header(): React.ReactElement {
  const [showMenu, setShowMenu] = useBoolean()
  const { colorMode, toggleColorMode } = useColorMode()
  const lightMode = colorMode === "light"
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
        <Heading as="h6" size="lg" colorScheme="orange">
          <Link href="/">Wallet Manager</Link>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={setShowMenu.toggle} as="button">
        {showMenu ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box
        display={{ base: showMenu ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
        as="nav"
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "column", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <NavItem>
            <Link href="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link href="/load">Load</Link>
          </NavItem>
          <NavItem>
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
          <NavItem isLast>
            <Button size="sm" aria-label="Change color theme" onClick={toggleColorMode}>
              {lightMode ? <MoonIcon /> : <SunIcon />}
            </Button>
          </NavItem>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
