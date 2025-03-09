"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Learner } from "@/types/learner";
import { MoreHorizontal, ArrowUpDown, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/framework/column-header";

export const columns: ColumnDef<Learner>[] = [
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
    cell: ({ row }) => <div className="text-left">{row.original.name}</div>,
    // cell: ({ row }) => (
    //   <div className="text-left">
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="ghost" className="h-8 w-8 p-0">
    //           <span className="sr-only">Open menu</span>
    //           <MoreHorizontal className="h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent>
    //         <DropdownMenuItem>Edit</DropdownMenuItem>
    //         <DropdownMenuItem>Delete</DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //     {row.original.name}
    //   </div>
    // ),
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Email" column={column} />;
    },
    accessorKey: "email",
    cell: ({ row }) => <div className="text-left">{row.original.email}</div>,
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Language" column={column} />;
    },
    accessorKey: "language",
    cell: ({ row }) => <div className="text-left">{row.original.language}</div>,
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Level" column={column} />;
    },
    accessorKey: "level",
    cell: ({ row }) => <div className="text-left">{row.original.level}</div>,
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Last Activity" column={column} />;
    },
    accessorKey: "lastActivity",
    cell: ({ row }) => (
      <div className="text-left">{row.original.lastActivity}</div>
    ),
  },
];
