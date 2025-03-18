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
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VirtualTeacher } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { CreateTeacherRequest, Teacher } from "@/models/teacherModel";
import { createTeacher, updateTeacher } from "@/services/teacherService";
import { toast } from "sonner";
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
  resetData: () => void;
}

export function AddEditTeacherDialog({
  action,
  data,
  isOpen,
  onOpenChange,
  resetData,
}: AddEditAccountDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
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
          reset({
            name: data?.name,
            description: data?.description,
            isMale: data?.isMale,
            code: data?.code,
            sample: data?.sample,
          });
        } else {
          reset();
        }
      }
  }, [data, action, isOpen]);

  const onSubmit = async (formData: DialogFormData) => {
    var res = null;
    if (action === VirtualTeacherAction.CREATE) {
      const teacher: CreateTeacherRequest = {
        name: formData.name,
        description: formData.description,
        isMale: formData.isMale,
        code: formData.code,
        sample: formData.sample,
      };
      res = await createTeacher(teacher);
    } else if (action === VirtualTeacherAction.UPDATE) {
      const teacher: any = {
        id: data?.id || "",
        name: formData.name,
        description: formData.description,
        isMale: formData.isMale,
        code: formData.code,
        sample: formData.sample,
      };
      console.log(teacher);

      res = await updateTeacher(teacher);
    }

    if (res?.statusCode === 200) {
      onOpenChange(false);
      reset();
      toast.success("Teacher created successfully");
      resetData?.();
    } else {
      toast.error("Failed to create teacher");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[600px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl">
            {action === VirtualTeacherAction.CREATE
              ? "Add Virtual Teacher"
              : "Edit Virtual Teacher"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {action === VirtualTeacherAction.CREATE
              ? "Add a new virtual teacher to the system. Fill in all the required fields below."
              : "Update the virtual teacher details. Modify the fields you want to change."}
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
                  autoComplete="off"
                  autoFocus={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  style={{ userSelect: "text" }}
                  id="name"
                  {...register("name")}
                  className={cn(
                    errors?.name && "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Enter name"
                />
                {errors?.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.name?.message}
                  </p>
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
                  className={cn(
                    errors?.description &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Enter description"
                />
                {errors?.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.description?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right font-medium">
                Code
              </Label>
              <div className="col-span-3">
                <Input
                  id="code"
                  {...register("code")}
                  className={cn(
                    errors?.code && "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Enter code"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sample" className="text-right font-medium">
                Sample
              </Label>
              <div className="col-span-3">
                <Input
                  id="sample"
                  {...register("sample")}
                  className={cn(
                    errors?.sample &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Enter sample"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right font-medium">
                Gender
              </Label>
              <div className="col-span-3">
                <Select
                  onValueChange={(value) =>
                    setValue("isMale", value === "true")
                  }
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
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.isMale?.message}
                  </p>
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
