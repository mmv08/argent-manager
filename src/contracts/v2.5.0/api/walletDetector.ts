import { ethers } from "ethers"
import ArgentWalletDetectorArtifact from "../build/ArgentWalletDetector.json"
import { ArgentWalletDetector } from "../types/ArgentWalletDetector.d"
import { WALLET_DETECTOR_ADDRESS } from "../addresses"

function getDetector(provider: ethers.providers.BaseProvider): ArgentWalletDetector {
  return new ethers.Contract(WALLET_DETECTOR_ADDRESS, ArgentWalletDetectorArtifact.abi) as ArgentWalletDetector
}

async function isArgentWallet(address: string, provider: ethers.providers.BaseProvider): Promise<boolean> {
  const detector = getDetector(provider)
  const addressIsWallet = await detector.isArgentWallet(address)

  return addressIsWallet
}

export { isArgentWallet }
