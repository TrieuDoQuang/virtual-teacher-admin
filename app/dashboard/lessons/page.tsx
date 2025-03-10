import { DataTable } from "@/components/framework/data-table";
import { lessons } from "@/types/lesson";
import { columns, listHeaderSearch } from "./columns";
import { DialogDemo } from "../account/add-edit-account";

export default function LessonPlanPage() {
    const data = lessons;
    return (
        <div>
            <h1 className="font-bold text-2xl">Lesson Plan</h1>
            <DataTable columns={columns} data={data} listHeaderSearch={listHeaderSearch} addEditDialog={<DialogDemo />}/>
        </div>
    )
}
