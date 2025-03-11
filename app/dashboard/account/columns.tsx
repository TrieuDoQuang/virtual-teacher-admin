"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Learner } from "@/types/learner";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/framework/column-header";
import { SearchModel } from "@/models/searchModel";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash, Pencil } from "lucide-react";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export interface DataTableActionsProps {
  setAction: (action: VirtualTeacherAction) => void;
  setData: (data: Learner) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleDelete: () => void;
}

export const columns = ({
  setAction,
  setData,
  setIsOpen,
  handleDelete,
}: DataTableActionsProps): ColumnDef<Learner>[] => [
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
  {
    id: "actions",
    header: ({ column }) => {
      return <DataTableColumnHeader title="Actions" column={column} />;
    },
    cell: ({ row }) => {
      const [showDeleteDialog, setShowDeleteDialog] = useState(false);

      return (
        <div className="text-left">
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setAction(VirtualTeacherAction.UPDATE);
                    setData(row.original);
                    setIsOpen(true);
                  }}
                >
                  <Pencil width={16} height={16} />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center gap-2 text-red-600"
                  onClick={() => {
                    setData(row.original);
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash width={16} height={16} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this account? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  className="cursor-pointer text-white"
                  onClick={() => {
                    handleDelete();
                    setShowDeleteDialog(false);
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export const listHeaderSearch: SearchModel[] = [
  {
    title: "Name",
    type: "name",
  },
  {
    title: "Email",
    type: "email",
  },
  {
    title: "Language",
    type: "language",
  },
  {
    title: "Level",
    type: "level",
  },
  {
    title: "Last Activity",
    type: "lastActivity",
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
