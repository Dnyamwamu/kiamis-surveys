import { render, screen } from "@testing-library/react"
import FertilizerPage from "./page"

type FertilizerQueryResult = {
  data:
    | {
        description_for_daily: string
        summary: {
          farmers: number
          redemptions: number
          units: number
          total_value: number
          client_payment: number
        }
        daily: Array<{
          id: number
          entry_date: string
          farmers: number
          units: number
          total_value: number
          client_payment: number
        }>
      }
    | null
  isLoading: boolean
  error: unknown
}

type UserProfile = {
  role: string
  profile: {
    county: string
    subcounty: string
    ward: string
  }
}

const mockUseAuth: { user: UserProfile } = {
  user: {
    role: "ADMIN",
    profile: {
      county: "Nairobi",
      subcounty: "West",
      ward: "Ward 1",
    },
  },
}

const mockQueryResult: FertilizerQueryResult = {
  data: {
    description_for_daily: "latest fertilizer distribution metrics",
    summary: {
      farmers: 1000,
      redemptions: 250,
      units: 500,
      total_value: 12345678,
      client_payment: 5000000,
    },
    daily: [
      {
        id: 1,
        entry_date: "2026-04-06",
        farmers: 200,
        units: 40,
        total_value: 987654,
        client_payment: 432100,
      },
    ],
  },
  isLoading: false,
  error: null,
}

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => mockUseAuth,
}))

jest.mock("@/lib/features/api/fertilizer/fertilizerApi", () => ({
  useGetDailyRedemptionQuery: () => mockQueryResult,
}))

jest.mock("@/components/admin-unit-filter", () => ({
  AdminUnitFilter: () => <div data-testid="admin-unit-filter" />,
}))

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe("FertilizerPage", () => {
  it("renders the fertilizer dashboard header and summary values", () => {
    render(<FertilizerPage />)

    expect(
      screen.getByRole("heading", { name: /fertilizer subsidy dashboard/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/latest fertilizer distribution metrics/i)).toBeInTheDocument()
    expect(screen.getByText(/1,000/)).toBeInTheDocument()
    expect(screen.getByText(/250/)).toBeInTheDocument()
    expect(screen.getByText(/500/)).toBeInTheDocument()
    expect(screen.getByText(/12,345,678/)).toBeInTheDocument()
    expect(screen.getByText(/5,000,000/)).toBeInTheDocument()
    expect(screen.getByTestId("admin-unit-filter")).toBeInTheDocument()
  })

  it("does not require county selection for Admin users", () => {
    render(<FertilizerPage />)

    expect(
      screen.queryByText(/select administrative unit/i)
    ).not.toBeInTheDocument()
  })

  it("renders a loading state when data is loading", () => {
    mockQueryResult.isLoading = true
    mockQueryResult.data = null
    render(<FertilizerPage />)

    expect(screen.getByText(/loading fertilizer data/i)).toBeInTheDocument()

    mockQueryResult.isLoading = false
    mockQueryResult.data = {
      description_for_daily: "latest fertilizer distribution metrics",
      summary: {
        farmers: 1000,
        redemptions: 250,
        units: 500,
        total_value: 12345678,
        client_payment: 5000000,
      },
      daily: [
        {
          id: 1,
          entry_date: "2026-04-06",
          farmers: 200,
          units: 40,
          total_value: 987654,
          client_payment: 432100,
        },
      ],
    }
  })

  it("renders an error state when data fails to load", () => {
    mockQueryResult.isLoading = false
    mockQueryResult.error = true
    mockQueryResult.data = null
    render(<FertilizerPage />)

    expect(screen.getByText(/error loading data/i)).toBeInTheDocument()
   

    mockQueryResult.error = null
    mockQueryResult.data = {
      description_for_daily: "latest fertilizer distribution metrics",
      summary: {
        farmers: 1000,
        redemptions: 250,
        units: 500,
        total_value: 12345678,
        client_payment: 5000000,
      },
      daily: [
        {
          id: 1,
          entry_date: "2026-04-06",
          farmers: 200,
          units: 40,
          total_value: 987654,
          client_payment: 432100,
        },
      ],
    }
  })
})
