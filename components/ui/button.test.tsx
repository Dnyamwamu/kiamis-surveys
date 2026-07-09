import { render, screen } from "@testing-library/react"
import { Button } from "./button"

describe("Button", () => {
  it("renders with default data attributes and text", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button", { name: /click me/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("data-variant", "default")
    expect(button).toHaveAttribute("data-size", "default")
  })

  it("renders child anchor when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    )

    const link = screen.getByRole("link", { name: /link/i })
    expect(link).toHaveAttribute("href", "/test")
  })
})
