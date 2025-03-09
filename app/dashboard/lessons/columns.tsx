"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Lesson } from "@/types/lesson";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/framework/column-header";

export const columns: ColumnDef<Lesson>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }   
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Name" column={column} />;
    },
    accessorKey: "name",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Description" column={column} />;
    },
    accessorKey: "description",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Created At" column={column} />;
    },
    accessorKey: "createdAt",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Updated At" column={column} />;
    },
    accessorKey: "updatedAt",
  },
];

