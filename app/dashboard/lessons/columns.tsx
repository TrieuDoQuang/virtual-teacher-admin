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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Chip } from "@/components/chip";
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
        className="cursor-pointer"
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
                    <Button
                      className="cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        setData(row.original);
                      }}
                    >
                      <Trash width={16} height={16} />
                      Delete
                    </Button>
                  }
                  onSubmit={() => {
                    setData(row.original);
                    handleDelete();
                  }}
                  title="Delete Lesson"
                  description={`Are you sure you want to delete this lesson <strong>${row.original.title}</strong>? This action cannot be undone.`}
                  buttonText="Delete"
                /> */}
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Lesson</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this lesson? This action
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
      return <DataTableColumnHeader title="Title" column={column} />;
    },
    accessorKey: "title",
    cell: ({ row }) => {
      return (
        <div className="font-medium max-w-[200px] truncate">
          {row.original.title}
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Level" column={column} />;
    },
    accessorKey: "level",
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.level}</Badge>;
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Topic" column={column} />;
    },
    accessorKey: "topic",
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.original.topic}</Badge>;
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                {row.original.learningObjectives}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                <p className="whitespace-pre-wrap">
                  {row.original.learningObjectives}
                </p>
              </ScrollArea>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Vocabulary" column={column} />;
    },
    accessorKey: "vocabulary",
    cell: ({ row }) => {
      const vocabularyItems = row.original.vocabulary
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const displayCount = 3;
      const displayedItems = vocabularyItems.slice(0, displayCount);
      const remainingCount = vocabularyItems.length - displayCount;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-default">
              <div className="flex items-center gap-1.5">
                {displayedItems.map((item, index) => (
                  <Chip
                    key={`vocab-${index}-${item}`}
                    label={item}
                    variant="secondary"
                    className="text-xs"
                  />
                ))}
                {remainingCount > 0 && (
                  <Badge variant="secondary" className="h-5 text-xs">
                    +{remainingCount} more
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="w-[200px]">
              <ScrollArea className="h-[200px] w-full rounded-md">
                <div className="flex flex-wrap gap-1.5 p-1">
                  {vocabularyItems.map((item, index) => (
                    <Chip
                      key={`vocab-tooltip-${index}-${item}`}
                      label={item}
                      variant="secondary"
                      className="text-xs"
                    />
                  ))}
                </div>
              </ScrollArea>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                {row.original.conversationStructure}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                <div className="whitespace-pre-line">
                  {row.original.conversationStructure}
                </div>
              </ScrollArea>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    header: ({ column }) => {
      return <DataTableColumnHeader title="Duration" column={column} />;
    },
    accessorKey: "durationEstimation",
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="font-mono">
          {row.original.durationEstimation} min
        </Badge>
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
