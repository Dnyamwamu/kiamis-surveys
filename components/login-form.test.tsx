import { fireEvent, render, screen } from "@testing-library/react"
import LoginForm from "./login-form"

const mockPush = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

const mockAuthState = {
  login: jest.fn(),
  isLoading: false,
  error: null,
}

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => mockAuthState,
}))

describe("LoginForm", () => {
  beforeEach(() => {
    mockAuthState.login.mockClear()
    mockAuthState.isLoading = false
    mockAuthState.error = null
    jest.clearAllMocks()
  })

  it("renders the login fields and submit button", () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in to dashboard/i })).toBeInTheDocument()
  })

  it("toggles password visibility when the eye button is clicked", () => {
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement
    const buttons = screen.getAllByRole("button")
    const submitButton = buttons.find((button) => /sign in to dashboard/i.test(button.textContent || ""))
    const toggleButton = buttons.find((button) => button !== submitButton)

    expect(passwordInput.type).toBe("password")
    expect(toggleButton).toBeDefined()

    fireEvent.click(toggleButton!)
    expect(passwordInput.type).toBe("text")
    fireEvent.click(toggleButton!)
    expect(passwordInput.type).toBe("password")
  })

  it("shows validation errors for invalid email and password", async () => {
    render(<LoginForm />)

    fireEvent.submit(screen.getByRole("button", { name: /sign in to dashboard/i }))

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument()
    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument()
    expect(mockAuthState.login).not.toHaveBeenCalled()
  })

  it("displays loading state when auth is loading", () => {
    mockAuthState.isLoading = true
    render(<LoginForm />)

    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled()
  })
})
