"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/framework/pagination";
import { DataTableViewOptions } from "@/components/framework/column-toggle";
import { SearchModel } from "@/models/searchModel";
import { Delete, PlusIcon, TrashIcon } from "lucide-react";
import { ConfirmationDialog } from "../confirmation-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useSelectStore } from "@/stores/useSelectStore";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  listHeaderSearch: SearchModel[];
  addEditDialog: React.ReactElement;
  onAdd: () => void;
  onSubmitDelete: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  listHeaderSearch,
  addEditDialog,
  onAdd,
  onSubmitDelete,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [search, setSearch] = useState<SearchModel>(listHeaderSearch[0]);
  const { setSelectedItems } = useSelectStore();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility,
      rowSelection,
      columnFilters,
      sorting,
    },
  });

  const handleSelectedRows = () => {
    const listIds: TData[] = [];
    const listRows = table.getRowModel().rows.map((row) => row.original);
    const listRowIds = Object.keys(rowSelection);

    Object.entries(listRows).map(([key, value]) => {
      if (listRowIds.includes(key)) {
        listIds.push(value);
      }
    });

    return listIds;
  };

  // const handleRowAction = (action: string, data: TData) => {
  //   if (action == "actions") {
  //     setShowDeleteDialog(true);
  //   }
  // };

  // Update selected items when row selection changes
  useEffect(() => {
    const selectedRows = handleSelectedRows();
    setSelectedItems(selectedRows);
  }, [rowSelection, setSelectedItems]);

  return (
    <div>
      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onSubmit={() => {
          onSubmitDelete();
          setShowDeleteDialog(false);
        }}
        title="Delete"
        description="Are you sure you want to delete this item?"
        buttonText="Delete"
      />
      {addEditDialog}
      <div className="flex items-center py-4">
        {/* Add new button */}
        <div className="flex items-center gap-2 justify-end mr-[5px]">
          <Button onClick={onAdd} className="cursor-pointer">
            <PlusIcon className="w-4 h-4" />
            Add
          </Button>

          <ConfirmationDialog
            dialogTrigger={
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="gap-2 text-white cursor-pointer"
                  variant="destructive"
                  disabled={Object.keys(rowSelection).length === 0}
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </Button>
              </DialogTrigger>
            }
            onSubmit={() => {
              onSubmitDelete();
              setShowDeleteDialog(false);
            }}
            title="Delete"
            description="Are you sure you want to delete these selected items?"
            buttonText="Delete"
          />
        </div>

        {/* Column Filter */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                Search by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {listHeaderSearch.map((item: SearchModel) => (
                <DropdownMenuCheckboxItem
                  key={item?.title}
                  checked={
                    search?.type?.toLowerCase() === item?.type?.toLowerCase()
                  }
                  onClick={() => setSearch(item)}
                >
                  {item?.title}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder={`Search ${search?.title} ...`}
            value={
              (table
                .getColumn(`${search?.type}`)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(`${search?.type}`)
                ?.setFilterValue(event?.target?.value)
            }
            className="max-w-sm"
          />
        </div>
        {/* Show/Hide Columns */}
        <DataTableViewOptions table={table} />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup?.id}>
                {headerGroup?.headers?.map((header) => {
                  return (
                    <TableHead key={header?.id}>
                      {header?.isPlaceholder
                        ? null
                        : flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows?.map((row) => (
                <TableRow
                  key={row?.id}
                  data-state={row?.getIsSelected() && "selected"}
                >
                  {row?.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell?.id}
                      onClick={() => {
                        console.log(cell?.column?.id, "cell?.column?.id");
                        // handleRowAction(cell?.column?.id, row?.original);
                      }}
                    >
                      {flexRender(
                        cell?.column?.columnDef?.cell,
                        cell?.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
