"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Learner } from "@/types/learner";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Learner>[] = [
  {
    header: () => <div className="text-left">Name</div>,
    accessorKey: "name",
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
    header: () => <div className="text-left">Email</div>,
    accessorKey: "email",
    cell: ({ row }) => <div className="text-left">{row.original.email}</div>,
  },
  {
    header: () => <div className="text-left">Language</div>,
    accessorKey: "language",
    cell: ({ row }) => <div className="text-left">{row.original.language}</div>,
  },
  {
    header: () => <div className="text-left">Level</div>,
    accessorKey: "level",
    cell: ({ row }) => <div className="text-left">{row.original.level}</div>,
  },
  {
    header: () => <div className="text-left">Progress</div>,
    accessorKey: "progress",
    cell: ({ row }) => <div className="text-left">{row.original.progress}</div>,
  },
  {
    header: () => <div className="text-left">Last Activity</div>,
    accessorKey: "lastActivity",
    cell: ({ row }) => (
      <div className="text-left">{row.original.lastActivity}</div>
    ),
  },
];
