import { ethers } from "ethers"

function getFallbackProvider(): ethers.providers.BaseProvider {
  return ethers.getDefaultProvider("")
}

export { getFallbackProvider }
