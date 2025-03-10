import { virtualTeachers } from "@/types";
import { DataTable } from "@/components/framework/data-table";
import { columns, listHeaderSearch } from "./columns";
import { DialogDemo } from "../account/add-edit-account";
export default function VirtualTeacherPage() {
  const listSearch = listHeaderSearch;
  console.log(listSearch);
  return (
    <div>
      <h1 className="font-bold text-2xl">Virtual Teacher</h1>
      <DataTable columns={columns} data={virtualTeachers} listHeaderSearch={listSearch} addEditDialog={<DialogDemo />}/>
    </div>
  );
}
