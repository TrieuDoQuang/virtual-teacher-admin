"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Setting } from "@/types/setting";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/framework/column-header";
import { SearchModel } from "@/models/searchModel";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface DataTableActionsProps {
  setAction: (action: VirtualTeacherAction) => void;
  setData: (data: Setting) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleDelete: () => void;
}

export const columns = ({
  setAction,
  setData,
  setIsOpen,
  handleDelete,
}: DataTableActionsProps): ColumnDef<Setting>[] => [
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
                {/* <DropdownMenuItem
                  className="cursor-pointer flex items-center gap-2 text-red-600"
                  onClick={() => {
                    setData(row.original);
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash width={16} height={16} />
                  Delete
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Setting</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this setting? This action cannot be undone.
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
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="ID" column={column} />;
    },
    accessorKey: "id",
    cell: ({ row }) => {
      return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {row.original.id}
        </code>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Value" column={column} />;
    },
    accessorKey: "value",
    cell: ({ row }) => {
      const value = row.original.value;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="max-w-[300px] truncate text-sm">
                {value}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                <p className="whitespace-pre-wrap">{value}</p>
              </ScrollArea>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Created At" column={column} />;
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleString()}
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Updated At" column={column} />;
    },
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(row.original.updatedAt).toLocaleString()}
        </div>
      );
    },
  },
];

export const listHeaderSearch: SearchModel[] = [
  {
    title: "ID",
    type: "id",
  },
  {
    title: "Value",
    type: "value",
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
