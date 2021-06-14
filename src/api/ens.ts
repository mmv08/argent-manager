import { ethers } from "ethers"

async function resolveAddress(provider: ethers.providers.BaseProvider, name: string): Promise<string> {
  const address = await provider.resolveName(name)

  return address
}

function isValidEnsName(name: string): boolean {
  return /^([\w-]+\.)+(eth|xyz)$/.test(name)
}

export { resolveAddress, isValidEnsName }
