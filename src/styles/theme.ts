import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const extendedTheme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: true,
  fonts: {
    body: "Barlow, sans-serif",
    heading: "Barlow, serif",
  },
  colors: {
    black: "#070707",
    orange: {
      50: "#ffeadf",
      100: "#ffc6b3",
      200: "#faa285",
      300: "#f67d56",
      400: "#f25927",
      500: "#f36a3d",
      600: "#a93009",
      700: "#792205",
      800: "#4b1200",
      900: "#1f0300",
    },
  },
  components: {
    Text: {
      baseStyle: (properties) => ({
        color: mode("gray.900", "gray.50")(properties),
      }),
    },
    Heading: {
      baseStyle: (properties) => ({
        color: mode("gray.900", "gray.50")(properties),
      }),
    },
  },
})

export { extendedTheme }
