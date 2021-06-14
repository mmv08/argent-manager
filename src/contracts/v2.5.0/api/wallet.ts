import { ethers } from "ethers"
import BaseWalletArtifact from "../build/BaseWallet.json"
import { BaseWallet } from "../types/BaseWallet.d"

function getWallet(provider: ethers.providers.BaseProvider, address: string): BaseWallet {
  return new ethers.Contract(address, BaseWalletArtifact.abi, provider) as BaseWallet
}

async function getWalletOwner(provider: ethers.providers.BaseProvider, address: string): Promise<string> {
  const wallet = getWallet(provider, address)
  const owner = await wallet.owner()

  return owner
}

export { getWalletOwner }
