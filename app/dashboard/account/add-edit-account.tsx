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
import { Learner } from "@/types";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const dialogSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  language: z.string().min(1, "Language is required"),
  level: z.string().min(1, "Level is required"),
  progress: z.string().min(1, "Progress is required"),
  lastActivity: z.string().min(1, "Last activity is required"),
});

type DialogFormData = z.infer<typeof dialogSchema>;

interface AddEditAccountDialogProps {
  action: VirtualTeacherAction;
  data?: Learner | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEditAccountDialog({
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
  } = useForm<DialogFormData>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      name: "",
      email: "",
      language: "",
      level: "",
      progress: "",
      lastActivity: "",
    },
  });

  useEffect(() => {
    if (data && action === VirtualTeacherAction.UPDATE) {
      setValue("name", data?.name);
      setValue("email", data?.email);
      setValue("language", data?.language);
      setValue("level", data?.level);
      setValue("progress", data?.progress.toString());
      setValue("lastActivity", data?.lastActivity);
    } else {
      reset();
    }
  }, [data, action, setValue, reset]);

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
              <Label htmlFor="email" className="text-right font-medium">
                Email
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  {...register("email")}
                  className={cn(errors?.email && "border-red-500 focus-visible:ring-red-500")}
                  placeholder="Enter email"
                />
                {errors?.email && (
                  <p className="text-sm text-red-500 mt-1">{errors?.email?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right font-medium">
                Language
              </Label>
              <div className="col-span-3">
                <Input
                  id="language"
                  {...register("language")}
                  className={cn(errors?.language && "border-red-500 focus-visible:ring-red-500")}
                  placeholder="Enter language"
                />
                {errors?.language && (
                  <p className="text-sm text-red-500 mt-1">{errors?.language?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right font-medium">
                Level
              </Label>
              <div className="col-span-3">
                <Input
                  id="level"
                  {...register("level")}
                  className={cn(errors?.level && "border-red-500 focus-visible:ring-red-500")}
                  placeholder="Enter level"
                />
                {errors?.level && (
                  <p className="text-sm text-red-500 mt-1">{errors?.level?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="progress" className="text-right font-medium">
                Progress
              </Label>
              <div className="col-span-3">
                <Input
                  id="progress"
                  type="number"
                  {...register("progress")}
                  className={cn(errors?.progress && "border-red-500 focus-visible:ring-red-500")}
                  placeholder="Enter progress"
                />
                {errors?.progress && (
                  <p className="text-sm text-red-500 mt-1">{errors?.progress?.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastActivity" className="text-right font-medium">
                Last Activity
              </Label>
              <div className="col-span-3">
                <Input
                  id="lastActivity"
                  type="date"
                  {...register("lastActivity")}
                  className={cn(errors.lastActivity && "border-red-500 focus-visible:ring-red-500")}
                />
                {errors?.lastActivity && (
                  <p className="text-sm text-red-500 mt-1">{errors?.lastActivity?.message}</p>
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
              {action === VirtualTeacherAction.CREATE ? "Create Account" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
