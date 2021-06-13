import React from "react"
import makeBlockie from "ethereum-blockies-base64"
import { Avatar, AvatarProps } from "@chakra-ui/react"

type Properties = { address: string } & Omit<AvatarProps, "src" | "alt">

function Identicon({ address, size = "2xl", ...rest }: Properties): React.ReactElement {
  const image = React.useMemo(() => makeBlockie(address), [address])

  return <Avatar size={size} alt={`Blockie representing ethereum address ${address}`} src={image} {...rest} />
}

export { Identicon }
