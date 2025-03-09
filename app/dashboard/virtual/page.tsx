import { virtualTeachers } from "@/types";
import { DataTable } from "@/components/framework/data-table";
import { columns } from "./columns";
export default function VirtualTeacherPage() {
  return (
    <div>
      <h1 className="font-bold text-2xl">Virtual Teacher</h1>
      <DataTable columns={columns} data={virtualTeachers}/>
    </div>
  );
}
