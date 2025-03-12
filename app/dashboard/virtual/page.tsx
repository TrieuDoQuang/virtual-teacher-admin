"use client";

import { DataTable } from "@/components/framework/data-table";
import { columns, listHeaderSearch } from "./columns";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { useEffect, useState } from "react";
import { getAllTeacher } from "@/services/teacherService";
import TableSkeleton from "@/components/table-skeleton";
import { VirtualTeacher } from "@/types";
import { AddEditTeacherDialog } from "./add-edit-teacher";

export default function VirtualTeacherPage() {
  const [teachers, setTeachers] = useState<VirtualTeacher[]>([]);
  const [selectedData, setSelectedData] = useState<VirtualTeacher | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [action, setAction] = useState<VirtualTeacherAction>(
    VirtualTeacherAction.CREATE
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  

  const getTeachers = async () => {
    try {
      setIsLoading(true);
      const response = await getAllTeacher();
      setTeachers(response);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch teachers"
      );
      console.error("Error fetching teachers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const handleDelete = () => {
    console.log("Delete");
  };

  const handleAdd = () => {
    setAction(VirtualTeacherAction.CREATE);
    setSelectedData(null);
    setIsOpen(true);
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-red-500">{error}</div>
        <button
          onClick={getTeachers}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-2xl">Virtual Teacher</h1>
      <DataTable
        onSubmitDelete={handleDelete}
        columns={columns({
          setAction,
          setData: setSelectedData,
          setIsOpen,
          handleDelete,
        })}
        data={teachers}
        listHeaderSearch={listHeaderSearch}
        addEditDialog={
          <AddEditTeacherDialog
            action={action}
            data={selectedData}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
          />
        }
        onAdd={handleAdd}
      />
    </div>
  );
}
