"use client";

/**
 * Export data to CSV format
 */
export function exportToCSV(data: Record<string, unknown>[], filename: string, headers?: string[]) {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  // Get headers from first object if not provided
  const csvHeaders = headers || Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    csvHeaders.join(","),
    ...data.map((row) =>
      csvHeaders
        .map((header) => {
          const value = row[header];
          // Escape commas and quotes in values
          if (value === null || value === undefined) return "";
          const stringValue = String(value);
          if (stringValue.includes(",") || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(",")
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Format data for CSV export with custom formatting
 */
export function formatDataForExport(
  data: Record<string, unknown>[],
  keyMapping?: Record<string, string>,
  formatters?: Record<string, (value: unknown) => string>
) {
  return data.map((item) => {
    const formattedItem: Record<string, unknown> = {};

    Object.keys(item).forEach((key) => {
      const displayKey = keyMapping?.[key] || key;
      const value = item[key];

      if (formatters && formatters[key]) {
        formattedItem[displayKey] = formatters[key](value);
      } else {
        formattedItem[displayKey] = value;
      }
    });

    return formattedItem;
  });
}
