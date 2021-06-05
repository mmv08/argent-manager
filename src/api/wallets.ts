import Onboard from "bnc-onboard"

const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY

const wallets = [
  { walletName: "metamask", preferred: true },
  {
    walletName: "walletConnect",
    preferred: true,
    infuraKey,
  },
  { walletName: "trust", preferred: true },
]

const onboard = Onboard({
  networkId: Number.parseInt(process.env.NETWORK_ID || "1"),
  subscriptions: {
    wallet: (wallet) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedWallet", wallet.name || "")
      }
    },
  },
  walletSelect: {
    wallets,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function connectToWallet(name?: string): Promise<any> {
  const walletSelect = await onboard.walletSelect(name)

  if (walletSelect) {
    await onboard.walletCheck()

    const { wallet } = onboard.getState()

    return wallet.provider
  }

  throw new Error("No wallet selected")
}

export { connectToWallet }
