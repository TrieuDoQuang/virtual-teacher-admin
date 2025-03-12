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
import { Badge, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Chip } from "@/components/chip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
export interface DataTableActionsProps {
  setAction: (action: VirtualTeacherAction) => void;
  setData: (data: Lesson) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleDelete: () => void;
}

export const columns = ({
  setAction,
  setData,
  setIsOpen,
  handleDelete,
}: DataTableActionsProps): ColumnDef<Lesson>[] => [
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
      return <DataTableColumnHeader title="Title" column={column} />;
    },
    accessorKey: "title",
    cell: ({ row }) => {
      return <strong className="text-sm max-w-[200px] truncate">{row.original.title}</strong>;
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Level" column={column} />;
    },
    accessorKey: "level",
    cell: ({ row }) => {
      return <strong className="text-sm max-w-[200px] truncate">{row.original.level}</strong>;
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Topic" column={column} />;
    },
    accessorKey: "topic",
    cell: ({ row }) => {
      return <strong className="text-sm max-w-[200px] truncate">{row.original.topic}</strong>;
    },
  },
  {
    header: ({ column }) => {
      return (
        <DataTableColumnHeader title="Learning Objectives" column={column} />
      );
    },
    accessorKey: "learningObjectives",
    cell: ({ row }) => {
      return (
        <p className="text-sm max-w-[200px">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm max-w-[200px] truncate">
                  {row.original.learningObjectives}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{row.original.learningObjectives}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Vocabulary" column={column} />;
    },
    accessorKey: "vocabulary",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-1.5 py-1">
          {row.original.vocabulary
            .split(",")
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map((item, index) => (
              <Chip 
                key={`vocab-${index}-${item}`} 
                label={item} 
                variant="secondary"
                className="text-xs"
              />
            ))}
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <DataTableColumnHeader title="Conversation Structure" column={column} />
      );
    },
    accessorKey: "conversationStructure",
    cell: ({ row }) => {
      return (
        <ScrollArea className="h-[200px] w-[300px] rounded-md border p-4">
          <div style={{ whiteSpace: "pre-line" }}>
            {row.original.conversationStructure}
          </div>
        </ScrollArea>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <DataTableColumnHeader title="Duration Estimation" column={column} />
      );
    },
    accessorKey: "durationEstimation",
    cell: ({ row }) => {
      return <strong>{row.original.durationEstimation} minutes</strong>;
    },
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
];

export const listHeaderSearch: SearchModel[] = [
  {
    title: "Title",
    type: "title",
  },
  {
    title: "Level",
    type: "level",
  },
  {
    title: "Topic",
    type: "topic",
  },
  {
    title: "Learning Objectives",
    type: "learningObjectives",
  },
  {
    title: "Vocabulary",
    type: "vocabulary",
  },
  {
    title: "Conversation Structure",
    type: "conversationStructure",
  },
  {
    title: "Duration Estimation",
    type: "durationEstimation",
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
