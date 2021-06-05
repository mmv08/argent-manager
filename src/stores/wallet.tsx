import create, { EqualityChecker, StateSelector, UseStore } from "zustand"
import { createContext, useContext, useState } from "react"
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers"
import { assertDefined } from "src/utils/guards"

type WalletInfo = { loaded: boolean; account: string }

type WalletState = WalletInfo & {
  provider?: Web3Provider
  signer?: JsonRpcSigner
  fetchAndSetProvider: (provider: Web3Provider) => Promise<void>
  disconnect: () => void
  updateProvider: () => void
}

function initializeStore() {
  return create<WalletState>((set, get) => ({
    loaded: false,
    account: "",
    provider: undefined,
    signer: undefined,

    fetchAndSetProvider: async (provider: Web3Provider) => {
      const account = (await provider.listAccounts())[0]
      if (!account) {
        return
      }

      return set({ account, loaded: true, provider, signer: provider.getSigner() })
    },

    updateProvider: async () => {
      const { provider } = get()

      if (!provider) {
        return
      }

      const account = (await provider.listAccounts())[0]

      if (!account) {
        return set({
          loaded: false,
          account: "",
          provider: undefined,
          signer: undefined,
        })
      }

      return set({ account, loaded: true })
    },

    disconnect: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("selectedWallet")
      }

      return set({
        loaded: false,
        account: "",
        provider: undefined,
        signer: undefined,
      })
    },
  }))
}

// eslint-disable-next-line unicorn/no-useless-undefined
const context = createContext<UseStore<WalletState> | undefined>(undefined)
const { Provider } = context

function useWalletStore<U>(selector: StateSelector<WalletState, U>, equalityFunction?: EqualityChecker<U>): U {
  const useStore = useContext(context)
  assertDefined(useStore)

  return useStore(selector, equalityFunction)
}

function WalletProvider(properties: { children: React.ReactNode }): React.ReactElement {
  const { children } = properties
  const [useStore] = useState(initializeStore)

  return <Provider value={useStore}>{children}</Provider>
}

export { useWalletStore, WalletProvider }
