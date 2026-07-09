import { exportToCSV, formatDataForExport } from "./export-utils"

describe("export utils", () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    Object.defineProperty(window, "URL", {
      value: {
        createObjectURL: jest.fn().mockReturnValue("blob:url"),
      },
      configurable: true,
    })
  })

  it("formats data with key mapping and formatters", () => {
    const data = [{ firstName: "Jane", age: 30 }]
    const formatted = formatDataForExport(
      data,
      { firstName: "First Name" },
      { age: (value) => `${value} years` }
    )

    expect(formatted).toEqual([
      { "First Name": "Jane", age: "30 years" },
    ])
  })

  it("creates a downloadable CSV blob", () => {
    const clickMock = jest.fn()
    const link = document.createElement("a")
    link.click = clickMock

    jest.spyOn(document, "createElement").mockReturnValue(link)
    const appendSpy = jest.spyOn(document.body, "appendChild")
    const removeSpy = jest.spyOn(document.body, "removeChild")

    exportToCSV(
      [
        { name: "Alice", score: 100 },
        { name: "Bob", score: 90 },
      ],
      "results"
    )

    expect(window.URL.createObjectURL).toHaveBeenCalled()
    expect(link.getAttribute("download")).toBe("results.csv")
    expect(clickMock).toHaveBeenCalled()
    expect(appendSpy).toHaveBeenCalledWith(link)
    expect(removeSpy).toHaveBeenCalledWith(link)
  })

  it("does nothing when data is empty", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {})
    exportToCSV([], "empty")
    expect(consoleError).toHaveBeenCalledWith("No data to export")
    expect(window.URL.createObjectURL).not.toHaveBeenCalled()
  })
})
