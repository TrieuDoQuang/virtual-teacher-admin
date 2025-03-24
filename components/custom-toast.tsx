import { CheckCircle, XCircle, Info, AlertCircle } from "lucide-react";

export const CustomToast = ({ message, type }: { message: string, type: "success" | "error" | "info" | "warning" }   ) => {
  return (
    <div className={`${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : type === "info" ? "bg-blue-500" : "bg-yellow-500"} text-white p-4 rounded-md flex items-center gap-2`}>
      {type === "success" ? <CheckCircle className="w-4 h-4" /> : type === "error" ? <XCircle className="w-4 h-4" /> : type === "info" ? <Info className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      <p>{message}</p>
    </div>
  );
};
