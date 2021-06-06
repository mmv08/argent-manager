import { Flex } from "@chakra-ui/react"
import Header from "./Header"

const Layout: React.FC = function (properties) {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Header />
      {properties.children}
    </Flex>
  )
}

export { Layout }
