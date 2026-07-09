import { cn } from "./utils"

describe("cn utility", () => {
  it("merges class names and removes duplicates", () => {
    const merged = cn("text-sm", "font-medium", "text-sm", "px-4")
    expect(merged.split(" ").sort()).toEqual(["font-medium", "px-4", "text-sm"].sort())
  })

  it("handles falsy values gracefully", () => {
    expect(cn("text-sm", false && "hidden", undefined, null, "px-4")).toBe(
      "text-sm px-4"
    )
  })
})
