/**
 * AG Grid configuration and utilities for the admin dashboard
 * Provides consistent theming, setup, and helper functions
 */

import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import type { ColDef, GridOptions } from "ag-grid-community";

// Register AG Grid modules (only needs to be done once)
ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * Dark mode AG Grid theme matching shadcn/ui design system
 * Based on the "new-york" theme style with dark mode colors
 */
export const agGridDarkTheme = themeQuartz.withParams({
  // Base colors from shadcn dark mode
  backgroundColor: "hsl(224 71% 4%)",
  foregroundColor: "hsl(213 31% 91%)",

  // Borders
  borderColor: "hsl(216 34% 17%)",
  borderRadius: 8,

  // Headers
  headerBackgroundColor: "hsl(224 71% 4%)",
  headerTextColor: "hsl(213 31% 91%)",
  headerFontWeight: 600,

  // Rows
  rowBorder: true,
  oddRowBackgroundColor: "hsl(224 71% 4%)",

  // Hover state
  rowHoverColor: "hsl(215 28% 17%)",

  // Selected rows
  selectedRowBackgroundColor: "hsl(217 33% 17%)",

  // Inputs and filters
  inputBackgroundColor: "hsl(224 71% 4%)",
  inputBorder: "solid 1px hsl(216 34% 17%)",
  inputFocusBorder: "solid 1px hsl(216 87% 52%)",

  // Accent color (primary)
  accentColor: "hsl(216 87% 52%)",

  // Spacing
  spacing: 8,
  cellHorizontalPadding: 16,
});

/**
 * Default column definition for all AG Grid tables
 * Provides consistent column behavior across the app
 */
export const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
};

/**
 * Default grid options for all AG Grid tables
 * Provides consistent grid behavior and features
 */
export const defaultGridOptions: GridOptions = {
  pagination: true,
  paginationPageSize: 20,
  paginationPageSizeSelector: [10, 20, 50, 100],
  enableCellTextSelection: true,
  rowSelection: {
    mode: "multiRow",
    enableClickSelection: false,
  },
  animateRows: true,
  theme: agGridDarkTheme,
};

/**
 * Common cell renderers for AG Grid columns
 */
export const cellRenderers = {
  /**
   * Renders a boolean value as Yes/No with color coding
   */
  boolean: (params: { value: boolean }) => (
    <span
      className={params.value ? "text-blue-400 font-medium" : "text-gray-400"}
    >
      {params.value ? "Yes" : "No"}
    </span>
  ),

  /**
   * Renders a value with a fallback for empty/null values
   */
  withFallback:
    (fallback = "—") =>
    (params: { value: any }) =>
      params.value || fallback,

  /**
   * Formats a date value to a readable string
   */
  date: (params: { value: string | Date }) => {
    if (!params.value) return "—";
    return new Date(params.value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },

  /**
   * Formats a datetime value to a readable string with time
   */
  datetime: (params: { value: string | Date }) => {
    if (!params.value) return "—";
    return new Date(params.value).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
};

/**
 * Common column definitions that can be reused across different tables
 */
export const commonColumnDefs = {
  /**
   * Email column with text filter
   */
  email: (options?: Partial<ColDef>): ColDef => ({
    field: "email",
    headerName: "Email",
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 2,
    minWidth: 250,
    ...options,
  }),

  /**
   * Boolean column with Yes/No rendering
   */
  boolean: (
    field: string,
    headerName: string,
    options?: Partial<ColDef>
  ): ColDef => ({
    field,
    headerName,
    filter: "agTextColumnFilter",
    floatingFilter: true,
    cellRenderer: cellRenderers.boolean,
    flex: 1,
    minWidth: 100,
    ...options,
  }),

  /**
   * Date column with date filter and formatting
   */
  date: (
    field: string,
    headerName: string,
    options?: Partial<ColDef>
  ): ColDef => ({
    field,
    headerName,
    filter: "agDateColumnFilter",
    floatingFilter: true,
    valueFormatter: (params) => cellRenderers.date(params),
    flex: 1,
    minWidth: 130,
    ...options,
  }),

  /**
   * Generic text column with optional fallback
   */
  text: (
    field: string,
    headerName: string,
    options?: Partial<ColDef>
  ): ColDef => ({
    field,
    headerName,
    filter: "agTextColumnFilter",
    floatingFilter: true,
    cellRenderer: cellRenderers.withFallback("—"),
    flex: 1,
    minWidth: 120,
    ...options,
  }),
};

/**
 * Exports data from an AG Grid instance to CSV
 * @param gridApi - The AG Grid API instance
 * @param filename - The name of the file (without extension)
 */
export function exportToCSV(
  gridApi: any,
  filename: string = `export-${new Date().toISOString().split("T")[0]}`
) {
  if (gridApi) {
    gridApi.exportDataAsCsv({
      fileName: `${filename}.csv`,
    });
  }
}
