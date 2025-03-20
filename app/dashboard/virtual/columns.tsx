"use client";

import { ColumnDef } from "@tanstack/react-table";
import { VirtualTeacher } from "@/types/virtual-teacher";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/framework/column-header";
import { SearchModel } from "@/models/searchModel";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
export interface DataTableActionsProps {
  setAction: (action: VirtualTeacherAction) => void;
  setData: (data: VirtualTeacher) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleDelete: () => void;
}

export const columns = ({
  setAction,
  setData,
  setIsOpen,
  handleDelete,
}: DataTableActionsProps): ColumnDef<VirtualTeacher>[] => [
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
                {/* <ConfirmationDialog
                  dialogTrigger={
                    <DialogTrigger asChild>
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center gap-2 text-red-600"
                        onSelect={(e) => {
                          e.preventDefault();
                          setData(row.original);
                        }}
                      >
                        <Trash width={16} height={16} />
                        Delete
                      </DropdownMenuItem>
                    </DialogTrigger>
                  }
                  onSubmit={() => {
                    setData(row.original);
                    handleDelete();
                  }}
                  title="Delete Teacher"
                  description={`Are you sure you want to delete this teacher ${row.original.name}? This action cannot be undone.`}
                  buttonText="Delete"
                /> */}
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this account? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
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
      return <DataTableColumnHeader title="Name" column={column} />;
    },
    accessorKey: "name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.name}</div>;
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Description" column={column} />;
    },
    accessorKey: "description",
    cell: ({ row }) => {
      const description = row.original.description;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="max-w-[300px] truncate">{description}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs whitespace-pre-wrap">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Gender" column={column} />;
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isMale ? "default" : "secondary"}>
          {row.original.isMale ? "Male" : "Female"}
        </Badge>
      );
    },
    accessorKey: "isMale",
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Code" column={column} />;
    },
    accessorKey: "code",
    cell: ({ row }) => {
      return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {row.original.code}
        </code>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Sample" column={column} />;
    },
    accessorKey: "sample",
    cell: ({ row }) => {
      const sample = row.original.sample;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                {sample}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                <p className="whitespace-pre-wrap">{sample}</p>
              </ScrollArea>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
    title: "Description",
    type: "description",
  },
  {
    title: "Is Male",
    type: "isMale",
  },
  {
    title: "Code",
    type: "code",
  },
  {
    title: "Sample",
    type: "sample",
  },
];
