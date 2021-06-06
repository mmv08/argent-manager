import { ethers } from "ethers"

function getChecksumAddress(value: string): string {
  const address = ethers.utils.getAddress(value)

  return address
}

function isValidAddress(value: string): boolean {
  try {
    getChecksumAddress(value)
  } catch {
    return false
  }

  return true
}

export { isValidAddress, getChecksumAddress }
