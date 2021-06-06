import "@testing-library/jest-dom"
import { useRouter } from "next/router"
import { fireEvent, render, screen, waitFor } from "src/tests/testUtils"
import * as walletDetector from "src/contracts/v2.5.0/api/walletDetector"
import Load from "src/pages/load"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe("Load page", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should render and display an input and a button", () => {
    render(<Load />)

    expect(screen.getByPlaceholderText("Address or ENS name")).toBeInTheDocument()
    expect(screen.getByText("Continue")).toBeInTheDocument()
  })

  it("should redirect to wallet page if address is an argent wallet", async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, unicorn/prefer-module
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({ push }))
    const mock = jest.spyOn(walletDetector, "isArgentWallet").mockResolvedValueOnce(true)
    const walletAddress = "0x1948fC557ed7219D33138bD2cD52Da7F2047B2bb"
    render(<Load />)

    const input = screen.getByPlaceholderText("Address or ENS name")
    const submitButton = screen.getByText("Continue")

    fireEvent.change(input, { target: { value: walletAddress } })
    fireEvent.click(submitButton)

    await waitFor(() => expect(mock).toHaveBeenCalledTimes(1))
    // a little of implementation detail here
    expect(push).toHaveBeenCalledWith("/wallets/" + walletAddress)
  })

  it("should display an error message if address is not a wallet address or ens name", async () => {
    render(<Load />)

    const input = screen.getByPlaceholderText("Address or ENS name")
    const submitButton = screen.getByText("Continue")

    fireEvent.change(input, { target: { value: "not a wallet address or ens name" } })
    fireEvent.click(submitButton)

    await waitFor(() => expect(screen.getByText("The address doesn't look like an Argent wallet")).toBeInTheDocument())
  })

  it("should display an error message if address is not an argent wallet", async () => {
    const mock = jest.spyOn(walletDetector, "isArgentWallet").mockResolvedValueOnce(false)
    render(<Load />)

    const input = screen.getByPlaceholderText("Address or ENS name")
    const submitButton = screen.getByText("Continue")

    fireEvent.change(input, { target: { value: "0x1948fC557ed7219D33138bD2cD52Da7F2047B2bb" } })
    fireEvent.click(submitButton)

    await waitFor(() => expect(mock).toHaveBeenCalledTimes(1))
    expect(screen.getByText("The address doesn't look like an Argent wallet")).toBeInTheDocument()
  })
})
