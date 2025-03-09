import { DataTable } from "@/components/framework/data-table";
import { columns } from "./columns";
import { settings } from "@/types";
export default function SettingPage() {
    const data = settings
    return (
        <div>
            <h1 className="font-bold">Setting</h1>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
