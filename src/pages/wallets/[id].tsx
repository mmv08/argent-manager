import React from "react"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { useRouter } from "next/router"
import { getAlchemyProvider } from "src/api/rpcProviders"
import { resolveAddress } from "src/api/ens"
import { isValidAddress } from "src/utils/addresses"
import { isValidEnsName } from "src/utils/ens"
import { isArgentWallet } from "src/contracts/v2.5.0/api/walletDetector"
import { WalletCard } from "src/components/pages/wallets/WalletCard"

function WalletPage(): React.ReactElement {
  const {
    query: { id },
  } = useRouter()

  return (
    <div>
      <WalletCard address={id as string} />
    </div>
  )
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<unknown>> {
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

    return {
      props: {},
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default WalletPage
