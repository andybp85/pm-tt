import {builders} from "prosemirror-test-builder"

import {view} from "./index"

describe("Test index", () => {
  it("is working", () => {
    expect(view).toBeDefined()

  })
})

describe("Test Plugins", () => {
  it("are present", () => {
    expect(view.pluginViews.length).toBe(2)
  })
})
