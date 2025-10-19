"use client";

import { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { Button, Card } from "@uwdsc/ui";
import { Download } from "lucide-react";
import type { MemberProfile } from "@/types/api";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Create AG Grid theme with dark mode shadcn colors
const agTheme = themeQuartz.withParams({
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

interface MembershipsTableProps {
  profiles: MemberProfile[];
}

export function MembershipsTable({ profiles }: MembershipsTableProps) {
  const gridRef = useRef<AgGridReact>(null);

  // Column definitions
  const columnDefs = useMemo<ColDef<MemberProfile>[]>(
    () => [
      {
        field: "email",
        headerName: "Email",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 2,
        minWidth: 250,
      },
      {
        field: "first_name",
        headerName: "First Name",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1,
        minWidth: 150,
      },
      {
        field: "last_name",
        headerName: "Last Name",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1,
        minWidth: 150,
      },
      {
        field: "user_status",
        headerName: "Status",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1,
        minWidth: 120,
      },
      {
        field: "has_paid",
        headerName: "Has Paid",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        cellRenderer: (params: any) => (
          <span
            className={
              params.value ? "text-green-400 font-medium" : "text-gray-400"
            }
          >
            {params.value ? "Yes" : "No"}
          </span>
        ),
        flex: 1,
        minWidth: 100,
      },
      {
        field: "is_math_soc_member",
        headerName: "MathSoc",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        cellRenderer: (params: any) => (
          <span
            className={
              params.value ? "text-blue-400 font-medium" : "text-gray-400"
            }
          >
            {params.value ? "Yes" : "No"}
          </span>
        ),
        flex: 1,
        minWidth: 100,
      },
      {
        field: "faculty",
        headerName: "Faculty",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1,
        minWidth: 150,
        cellRenderer: (params: any) => params.value || "—",
      },
      {
        field: "term",
        headerName: "Term",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1,
        minWidth: 120,
        cellRenderer: (params: any) => params.value || "—",
      },
      {
        field: "wat_iam",
        headerName: "WatIAM",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1,
        minWidth: 150,
        cellRenderer: (params: any) => params.value || "—",
      },
      {
        field: "created_at",
        headerName: "Created At",
        filter: "agDateColumnFilter",
        floatingFilter: true,
        valueFormatter: (params) => {
          if (!params.value) return "—";
          return new Date(params.value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        },
        flex: 1,
        minWidth: 130,
      },
    ],
    []
  );

  // Default column definition
  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
    }),
    []
  );

  // Export to CSV
  const onExportCsv = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: `memberships-${new Date().toISOString().split("T")[0]}.csv`,
      });
    }
  }, []);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">All Members</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {profiles.length} total member{profiles.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={onExportCsv} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div
        className="rounded-lg overflow-hidden border"
        style={{ height: "600px", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={profiles}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          enableCellTextSelection={true}
          rowSelection={{
            mode: "multiRow",
            enableClickSelection: false,
          }}
          animateRows={true}
          theme={agTheme}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Use the filters above each column to search and filter data. Click on
        column headers to sort.
      </p>
    </Card>
  );
}
