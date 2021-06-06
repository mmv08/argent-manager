import React from "react"
import Link from "next/link"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Flex, Text, Button, Heading } from "@chakra-ui/react"

const MenuItems = (properties) => {
  const { children, isLast, to = "/", ...rest } = properties
  return (
    <Text mb={{ base: isLast ? 0 : 8, sm: 0 }} mr={{ base: 0, sm: isLast ? 0 : 8 }} display="block" {...rest}>
      <Link href={to}>{children}</Link>
    </Text>
  )
}

const Header = (properties) => {
  const [show, setShow] = React.useState(false)
  const toggleMenu = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["black", "black", "transparent", "transparent"]}
      color={["white", "white", "black", "black"]}
      {...properties}
    >
      <Flex align="center">
        <Heading as="h6" size="lg">
          Wallet Manager
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu} as="button">
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box display={{ base: show ? "block" : "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/">Home</MenuItems>
          <MenuItems to="/load">Load</MenuItems>
          <MenuItems to="/signup" isLast>
            <Button size="sm" rounded="md" colorScheme="orange">
              Connect a wallet
            </Button>
          </MenuItems>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
