import { ethers } from "ethers"

async function resolveAddress(provider: ethers.providers.BaseProvider, name: string): Promise<string> {
  const address = await provider.resolveName(name)

  return address
}

export { resolveAddress }
