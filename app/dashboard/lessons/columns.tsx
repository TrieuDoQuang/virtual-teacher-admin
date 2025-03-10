"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Lesson } from "@/types/lesson";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/framework/column-header";
import { SearchModel } from "@/models/searchModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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
    title: "Description",
    type: "description",
  },
  {
    title: "Created At",
    type: "createdAt",
  },
  {
    title: "Updated At",
    type: "updatedAt",
  },
];  

