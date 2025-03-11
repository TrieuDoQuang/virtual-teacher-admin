import { DataTable } from "@/components/framework/data-table";
import { columns, listHeaderSearch } from "./columns";
import { settings } from "@/types";
import { AddEditAccountDialog } from "../account/add-edit-account";
export default function SettingPage() {
  const data = settings;
  return (
    <div>
      <h1 className="font-bold">Setting</h1>
      <DataTable
        columns={columns}
        data={data}
        listHeaderSearch={listHeaderSearch}
        addEditDialog={<AddEditAccountDialog />}
      />
    </div>
  );
}
