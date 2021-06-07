import create, { EqualityChecker, StateSelector, UseStore } from "zustand"
import { createContext, useContext, useState } from "react"
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers"
import { connectToProvider } from "src/api/walletProvider"
import { assertDefined } from "src/utils/guards"

type ProviderInfo = { loaded: boolean; account: string }

type ProviderState = ProviderInfo & {
  provider?: Web3Provider
  signer?: JsonRpcSigner
  fetchAndSetProvider: (provider: Web3Provider) => Promise<void>
  disconnect: () => void
  updateProvider: () => void
  connectProvider: (name?: string) => void
}

function initializeStore() {
  return create<ProviderState>((set, get) => ({
    loaded: false,
    account: "",
    provider: undefined,
    signer: undefined,

    connectProvider: async (name?: string) => {
      const { updateProvider, disconnect, fetchAndSetProvider } = get()

      const connection = await connectToProvider(name)

      const provider = new Web3Provider(connection, 1)

      connection.on("chainChanged", updateProvider)
      connection.on("accountsChanged", updateProvider)
      connection.on("disconnect", disconnect)

      fetchAndSetProvider(provider)
    },

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
const context = createContext<UseStore<ProviderState> | undefined>(undefined)
const { Provider } = context

function useWalletProviderStore<U>(
  selector: StateSelector<ProviderState, U>,
  equalityFunction?: EqualityChecker<U>,
): U {
  const useStore = useContext(context)
  assertDefined(useStore)

  return useStore(selector, equalityFunction)
}

function WalletProvider(properties: { children: React.ReactNode }): React.ReactElement {
  const { children } = properties
  const [useStore] = useState(initializeStore)

  return <Provider value={useStore}>{children}</Provider>
}

export { useWalletProviderStore, WalletProvider }
