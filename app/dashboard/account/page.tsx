"use client";

import { learners } from "@/types/learner";
import { columns, listHeaderSearch } from "@/app/dashboard/account/columns";
import { DataTable } from "@/components/framework/data-table";
import { AddEditAccountDialog } from "./add-edit-account";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { useState } from "react";
import { Learner } from "@/types/learner";

export default function AccountPage() {
  const data = learners;
  const [action, setAction] = useState<VirtualTeacherAction>(VirtualTeacherAction.CREATE);
  const [selectedData, setSelectedData] = useState<Learner | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  const handleAdd = () => {
    setAction(VirtualTeacherAction.CREATE);
    setSelectedData(undefined);
    setIsOpen(true);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Account</h1>
      <DataTable
        columns={columns({ setAction, setData: setSelectedData, setIsOpen, setIsOpenDelete })}
        data={data}
        listHeaderSearch={listHeaderSearch}
        addEditDialog={
          <AddEditAccountDialog 
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
