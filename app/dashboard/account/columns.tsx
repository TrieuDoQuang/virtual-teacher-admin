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
import { ConfirmationDialog } from "@/components/confirmation-dialog";
export interface DataTableActionsProps {
  setAction: (action: VirtualTeacherAction) => void;
  setData: (data: Learner) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsOpenDelete: (isOpen: boolean) => void;
}

export const columns = ({ setAction, setData, setIsOpen, setIsOpenDelete }: DataTableActionsProps): ColumnDef<Learner>[] => [
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
    cell: ({ row }) => (
      <div className="text-left">
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
              Edit
              <Pencil width={16} height={16} />
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                  <ConfirmationDialog
                    isOpen={true}
                    setIsOpen={setIsOpenDelete}
                    onSubmit={() => {
                      console.log("Delete");
                    }}
                    title="Delete"
                    description={`Are you sure you want to delete ${row.original.name}?`}
                    buttonText="Delete"
                  />
              }}
              className="cursor-pointer flex items-center gap-2" 
            >
              Delete
              <Trash width={16} height={16} />
            </DropdownMenuItem>
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
