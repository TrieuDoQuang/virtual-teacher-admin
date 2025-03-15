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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VirtualTeacherAction } from "@/enums/framework-enum";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VirtualTeacher } from "@/types";
import { Textarea } from "@/components/ui/textarea";

const dialogSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  isMale: z.boolean(),
  code: z.string().min(1, "Code is required"),
  sample: z.string().min(1, "Sample is required"),
});

type DialogFormData = z.infer<typeof dialogSchema>;

interface AddEditAccountDialogProps {
  action: VirtualTeacherAction;
  data?: VirtualTeacher | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEditTeacherDialog({
  action,
  data,
  isOpen,
  onOpenChange,
}: AddEditAccountDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<DialogFormData>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      name: "",
      description: "",
      isMale: false,
      code: "",
      sample: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (data && action === VirtualTeacherAction.UPDATE) {
        setValue("name", data?.name);
        setValue("description", data?.description);
        setValue("isMale", data?.isMale);
        setValue("code", data?.code);
        setValue("sample", data?.sample);
      } else {
        reset();
      }
    }
  }, [data, action, setValue, reset, isOpen]);

  const onSubmit = (formData: DialogFormData) => {
    console.log("Form submitted:", formData);
    onOpenChange(false);
    reset();
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl">
            {action === VirtualTeacherAction.CREATE ? "Add Account" : "Edit Account"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {action === VirtualTeacherAction.CREATE
              ? "Add a new account to the system. Fill in all the required fields below."
              : "Update the account details. Modify the fields you want to change."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-medium">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  {...register("name")}
                  className={cn(errors?.name && "border-red-500 focus-visible:ring-red-500")}
                  placeholder="Enter name"
                />
                {errors?.name && (
                  <p className="text-sm text-red-500 mt-1">{errors?.name?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right font-medium">
                Description
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="description"
                  {...register("description")}
                  className={cn(errors?.description && "border-red-500 focus-visible:ring-red-500")}
                  placeholder="Enter description"
                />
                {errors?.description && (
                  <p className="text-sm text-red-500 mt-1">{errors?.description?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right font-medium">
                Gender
              </Label>
              <div className="col-span-3">
                <Select
                  {...register("isMale")}
                  value={watch("isMale") ? "true" : "false"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Male</SelectItem>
                    <SelectItem value="false">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors?.isMale && (
                  <p className="text-sm text-red-500 mt-1">{errors?.isMale?.message}</p>
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
            <Button type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
