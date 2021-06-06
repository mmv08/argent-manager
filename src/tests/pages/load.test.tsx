import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Load from "../../pages/load"

describe("Load page", () => {
  it("should render and display the input", () => {
    render(<Load />)

    expect(screen.getByPlaceholderText("Address or ENS name")).toBeInTheDocument()
    expect(screen.getByText("Continue")).toBeInTheDocument()
  })
})
