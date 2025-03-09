import { learners } from "@/types/learner";
import { columns } from "@/app/dashboard/account/columns";
import { DataTable } from "@/components/framework/data-table";

export default function AccountPage() {
    const data = learners;
    return (
        <div>
            <h1 className="text-2xl font-bold">Account</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
