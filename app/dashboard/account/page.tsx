import { learners } from "@/types/learner";
import { columns, listHeaderSearch } from "@/app/dashboard/account/columns";
import { DataTable } from "@/components/framework/data-table";
import { DialogDemo } from "./add-edit-account";
export default function AccountPage() {
  const data = learners;
  return (
    <div>
      <h1 className="text-2xl font-bold">Account</h1>
      <DataTable
        columns={columns}
        data={data}
        listHeaderSearch={listHeaderSearch}
        addEditDialog={<DialogDemo />}
      />
    </div>
  );
}
