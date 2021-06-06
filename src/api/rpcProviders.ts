import { ethers } from "ethers"
import { ALCHEMY_RPC_URL } from "src/utils/constants"

function getAlchemyProvider(): ethers.providers.BaseProvider {
  return ethers.getDefaultProvider(ALCHEMY_RPC_URL)
}

export { getAlchemyProvider }
