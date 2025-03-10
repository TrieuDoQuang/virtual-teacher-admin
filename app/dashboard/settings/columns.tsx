"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Setting } from "@/types/setting";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/framework/column-header";
import { SearchModel } from "@/models/searchModel";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
export const columns: ColumnDef<Setting>[] = [
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
      return <DataTableColumnHeader title="Value" column={column} />;
    },
    accessorKey: "value",
  },
  {
    id: "actions",
    header: ({ column }) => {
      return <DataTableColumnHeader title="Actions" column={column} />;
    },
    cell: ({ row }) => (
      <div className="text-left">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export const listHeaderSearch: SearchModel[] = [
  {
    title: "Name",
    type: "name",
  },
  {
    title: "Value",
    type: "value",
  },
];
