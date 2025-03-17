"use client";

import { columns, listHeaderSearch } from "./columns";
import { DataTable } from "@/components/framework/data-table";
import { AddEditAccountDialog } from "./add-edit-account";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { useEffect, useState } from "react";
import { Account } from "@/types";
import { getAllAccount } from "@/services/accountService";
import TableSkeleton from "@/components/table-skeleton";
import { useSelectStore } from "@/stores/useSelectStore";
import { deleteAccount } from "@/services/accountService";
import { toast } from "sonner";
export default function AccountPage() {
  const [action, setAction] = useState<VirtualTeacherAction>(
    VirtualTeacherAction.CREATE
  );
  const [selectedData, setSelectedData] = useState<Account | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedItems, setSelectedItems } = useSelectStore();

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllAccount();
      setAccounts(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch accounts");
      console.error("Error fetching accounts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAdd = () => {
    setAction(VirtualTeacherAction.CREATE);
    setSelectedData(null);
    setIsOpen(true);
  };

  const resetData = () => {
    setSelectedData(null);
    setIsOpen(false);
    setAction(VirtualTeacherAction.CREATE);
    fetchAccounts();
    setSelectedItems([]);
  };

  const handleDelete = async () => {
    let ids = selectedItems.map((item) => item?.id);

    if (ids.length === 0) {
      ids = [selectedData?.id];
    }
    const response = await deleteAccount(ids);
    if (response) {
      toast.success("Account deleted successfully");
      resetData();
    } else {
      toast.error("Failed to delete account");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <TableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-red-500">{error}</div>
        <button
          onClick={fetchAccounts}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns({
          setAction,
          setData: setSelectedData,
          setIsOpen,
          handleDelete,
        })}
        data={accounts}
        listHeaderSearch={listHeaderSearch}
        addEditDialog={
          <AddEditAccountDialog
            action={action}
            data={selectedData}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            resetData={resetData}
          />
        }
        onAdd={handleAdd}
        onSubmitDelete={handleDelete}
      />
    </div>
  );
}
