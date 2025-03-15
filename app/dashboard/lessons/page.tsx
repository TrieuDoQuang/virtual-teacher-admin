"use client";

import { columns, listHeaderSearch } from "./columns";
import { DataTable } from "@/components/framework/data-table";
import { AddEditLessonDialog } from "./add-edit-lesson";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { useEffect, useState } from "react";
import { Lesson } from "@/types";
import { getAllLessons, deleteLesson } from "@/services/lessonService";
import TableSkeleton from "@/components/table-skeleton";
import { useSelectStore } from "@/stores/useSelectStore";
import { toast } from "sonner";
export default function AccountPage() {
  const [action, setAction] = useState<VirtualTeacherAction>(
    VirtualTeacherAction.CREATE
  );
  const [selectedData, setSelectedData] = useState<Lesson | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedItems, setSelectedItems } = useSelectStore();

  const resetData = () => {
    setSelectedData(null);
    setIsOpen(false);
    setAction(VirtualTeacherAction.CREATE);
    fetchLessons();
    setSelectedItems([]);
  };

  const fetchLessons = async () => {
    try {
      setIsLoading(true);

      setError(null);

      const data = await getAllLessons();

      setLessons(data || []);

    } catch (err: any) {
      setError(err.message || "Failed to fetch lessons");

      console.error("Error fetching lessons:", err);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleAdd = () => {
    setAction(VirtualTeacherAction.CREATE);
    setSelectedData(null);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    let ids = selectedItems.map(item => item?.id);

    if (ids.length === 0) {
      console.log(selectedData, "selectedData");
      ids = [selectedData?.id];
    }
    const response = await deleteLesson(ids);
    if (response) {
      resetData();
      toast.success("Lesson deleted successfully");
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
          onClick={fetchLessons}
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
        data={lessons}
        listHeaderSearch={listHeaderSearch}
        addEditDialog={
          <AddEditLessonDialog
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
