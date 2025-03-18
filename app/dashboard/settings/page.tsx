"use client";

import { DataTable } from "@/components/framework/data-table";
import { columns, listHeaderSearch } from "./columns";
import { getAllSettings } from "@/services/settingService";
import { useEffect, useState } from "react";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { Setting } from "@/types/setting";
import { AddEditSettingDialog } from "./add-edit-setting";
import TableSkeleton from "@/components/table-skeleton";


export default function SettingPage() {
  const [action, setAction] = useState<VirtualTeacherAction>(
    VirtualTeacherAction.CREATE
  );
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Setting[]>([]);
  const [selectedData, setSelectedData] = useState<Setting | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchSettings();
  }, []);


  const resetData = () => {
    setSelectedData(null);
    setIsOpen(false);
    setAction(VirtualTeacherAction.CREATE);
    fetchSettings();
  };

  const handleDelete = async () => {
    console.log("delete");
  };


  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAllSettings();

      setData(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
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
          onClick={fetchSettings}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div>
      <h1 className="font-bold">Setting</h1>
      <DataTable
        columns={columns({
          setAction,
          setData: setSelectedData,
          setIsOpen,
          handleDelete,
        })}
        data={data}
        listHeaderSearch={listHeaderSearch}
        addEditDialog={<AddEditSettingDialog
          action={action}
          data={selectedData}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          resetData={resetData}
        />}
        onAdd={() => {
          setAction(VirtualTeacherAction.CREATE);
          setIsOpen(true);
        }}
        onSubmitDelete={handleDelete}
      />
    </div>
  );
}
