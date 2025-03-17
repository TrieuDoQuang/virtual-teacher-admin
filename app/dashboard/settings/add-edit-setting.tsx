"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Setting } from "@/types/setting";
import { updateSetting } from "@/services/settingService";
import { SettingModel } from "@/models/settingModel";
const dialogSchema = z.object({
  id: z.string().min(1, "Id is required"),
  value: z.string().min(1, "Value is required"),
});

type DialogFormData = z.infer<typeof dialogSchema>;

interface AddEditSettingDialogProps {
  action: VirtualTeacherAction;
  data?: Setting | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resetData: () => void;
}

export function AddEditSettingDialog({
  action,
  data,
  isOpen,
  onOpenChange,
  resetData,
}: AddEditSettingDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<DialogFormData>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      id: "",
      value: "",
    },
  });

  useEffect(() => {
    if (data && action === VirtualTeacherAction.UPDATE) {
      setValue("id", data?.id);
      setValue("value", data?.value);
    } else {
      reset();
    }
  }, [data, action, setValue, reset]);

  const onSubmit = async (formData: DialogFormData) => {
    const setting: SettingModel = {
      id: formData.id,
      value: formData.value,
    };
    const response = await updateSetting(setting);
    if (response) {
      if (response.statusCode === 200) {
        onOpenChange(false);
        toast.success("Setting updated successfully");
        reset();
        resetData?.();  
      }
      else {
        toast.error("Failed to update setting");
      }
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl">
            {action === VirtualTeacherAction.CREATE ? "Add Setting" : "Edit Setting"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {action === VirtualTeacherAction.CREATE
              ? "Add a new setting to the system. Fill in all the required fields below."
              : "Update the setting details. Modify the fields you want to change."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right font-medium">
                Setting ID
              </Label>
              <div className="col-span-3">
                <Input
                  id="id"
                  autoComplete="off"
                  autoFocus={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  style={{ userSelect: 'text' }}
                  {...register("id")}
                  className={cn(errors?.id && "border-red-500 focus-visible:ring-red-500")}
                  placeholder="Enter setting ID"
                  disabled={action === VirtualTeacherAction.UPDATE}
                />
                {errors?.id && (
                  <p className="text-sm text-red-500 mt-1">{errors?.id?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right font-medium">
                Value
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="value"
                  {...register("value")}
                  className={cn(errors?.value && "border-red-500 focus-visible:ring-red-500 h-[200px] resize-none transition-all")}
                  placeholder="Enter setting value"
                />
                {errors?.value && (
                  <p className="text-sm text-red-500 mt-1">{errors?.value?.message}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
