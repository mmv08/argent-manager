import React from "react"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { useRouter } from "next/router"
import { getAlchemyProvider } from "src/api/rpcProviders"
import { resolveAddress, isValidEnsName } from "src/api/ens"
import { isValidAddress } from "src/utils/addresses"
import { getWalletOwner } from "src/contracts/v2.5.0/api/wallet"
import { isArgentWallet } from "src/contracts/v2.5.0/api/walletDetector"
import { WalletCard } from "src/components/pages/wallets/WalletCard"

type ServerSideProperties = {
  owner: string
}

function WalletPage(properties: ServerSideProperties): React.ReactElement {
  const { owner } = properties
  const {
    query: { id },
  } = useRouter()

  return (
    <div>
      <WalletCard address={id as string} />
      {owner}
    </div>
  )
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<ServerSideProperties>> {
  try {
    const provider = getAlchemyProvider()
    let walletId = context.query.id as string

    // we validate the value locally first to save on requests to rpc provider
    const valueIsEns = isValidEnsName(walletId)
    const valueIsAddress = isValidAddress(walletId)
    if (!valueIsAddress && !valueIsEns) {
      return {
        notFound: true,
      }
    }

    if (valueIsEns) {
      walletId = await resolveAddress(provider, walletId)
      return {
        redirect: {
          destination: "/wallets/" + walletId,
          permanent: false,
        },
      }
    }

    const walletIsArgentWallet = await isArgentWallet(provider, walletId)
    if (!walletIsArgentWallet) {
      return {
        notFound: true,
      }
    }

    const owner = await getWalletOwner(provider, walletId)
    return {
      props: { owner },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default WalletPage
