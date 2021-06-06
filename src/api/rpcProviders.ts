import { ethers } from "ethers"
import { ALCHEMY_API_KEY } from "src/utils/constants"

function getAlchemyProvider(): ethers.providers.BaseProvider {
  return new ethers.providers.AlchemyProvider(1, ALCHEMY_API_KEY)
}

export { getAlchemyProvider }
