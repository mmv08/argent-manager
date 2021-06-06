import React from "react"
import { render as defaultRender, RenderResult } from "@testing-library/react"
import { RouterContext } from "next/dist/next-server/lib/router-context"
import { NextRouter } from "next/router"

export * from "@testing-library/react"

// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultParameters = Parameters<typeof defaultRender>
type RenderUI = DefaultParameters[0]
type RenderOptions = DefaultParameters[1] & { router?: Partial<NextRouter> }

export function render(ui: RenderUI, { wrapper, router, ...options }: RenderOptions = {}): RenderResult {
  if (!wrapper) {
    wrapper = function Wrapper({ children }) {
      return <RouterContext.Provider value={{ ...mockRouter, ...router }}>{children}</RouterContext.Provider>
    }
  }

  return defaultRender(ui, { wrapper, ...options })
}

const mockRouter: NextRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}

// 👀 from https://github.com/blitz-js/blitz/blob/848d961e1c9f4568484e64a4a3f36b5053952d2c/packages/core/test/test-utils.tsx
