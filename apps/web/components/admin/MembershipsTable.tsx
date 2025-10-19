"use client";

import { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { Button, Card } from "@uwdsc/ui";
import { Download } from "lucide-react";
import type { MemberProfile } from "@/types/api";
import {
  defaultColDef,
  defaultGridOptions,
  commonColumnDefs,
  exportToCSV,
  cellRenderers,
} from "@/lib/ag-grid";

interface MembershipsTableProps {
  profiles: MemberProfile[];
}

export function MembershipsTable({ profiles }: MembershipsTableProps) {
  const gridRef = useRef<AgGridReact>(null);

  // Column definitions using abstracted utilities
  const columnDefs = useMemo<ColDef<MemberProfile>[]>(
    () => [
      commonColumnDefs.email(),
      commonColumnDefs.firstName(),
      commonColumnDefs.lastName(),
      commonColumnDefs.text("user_status", "Status"),
      commonColumnDefs.boolean("has_paid", "Has Paid"),
      commonColumnDefs.boolean("is_math_soc_member", "MathSoc"),
      commonColumnDefs.text("faculty", "Faculty"),
      commonColumnDefs.text("term", "Term"),
      commonColumnDefs.text("wat_iam", "WatIAM"),
      commonColumnDefs.date("created_at", "Created At"),
    ],
    []
  );

  // Export to CSV using abstracted utility
  const onExportCsv = useCallback(() => {
    if (gridRef.current?.api) {
      exportToCSV(
        gridRef.current.api,
        `memberships-${new Date().toISOString().split("T")[0]}`
      );
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
          {...defaultGridOptions}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Use the filters above each column to search and filter data. Click on
        column headers to sort.
      </p>
    </Card>
  );
}
