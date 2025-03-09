"use client";

import { ColumnDef } from "@tanstack/react-table";
import { VirtualTeacher } from "@/types/virtual-teacher";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/framework/column-header";

export const columns: ColumnDef<VirtualTeacher>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
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
      return <DataTableColumnHeader title="Email" column={column} />;
    },
    accessorKey: "email",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Role" column={column} />;
    },
    accessorKey: "role",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Status" column={column} />;
    },
    accessorKey: "status",
  },

];
