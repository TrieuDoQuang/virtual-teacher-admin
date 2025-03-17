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
import { Account } from "@/types";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dialogSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  role: z.string().min(1, "Role is required"),
});

type DialogFormData = z.infer<typeof dialogSchema>;

interface AddEditAccountDialogProps {
  action: VirtualTeacherAction;
  data?: Account | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resetData: () => void;
}

export function AddEditAccountDialog({
  action,
  data,
  isOpen,
  onOpenChange,
  resetData,
}: AddEditAccountDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DialogFormData>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      username: "",
      email: "",
      role: "",
    },
  });

  useEffect(() => {
    if (data && action === VirtualTeacherAction.UPDATE) {
      reset({
        username: data.username,
        email: data.email,
        role: data.role,
        });
      } else {
        reset();
      }

  }, [data, action, reset]);

  const onSubmit = (formData: DialogFormData) => {
    console.log("Form submitted:", formData);
    onOpenChange(false);
    reset();
    resetData();
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
              ? "Add Account"
              : "Edit Account"}
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
                Username
              </Label>
              <div className="col-span-3">
                <Input
                  id="username"
                  {...register("username")}
                  autoComplete="off"
                  autoFocus={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  style={{ userSelect: 'text' }}
                  className={cn(
                    errors?.username &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Enter username"
                />
                {errors?.username && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.username?.message}
                  </p>
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
                  autoComplete="off"
                  autoFocus={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  style={{ userSelect: 'text' }}
                  className={cn(
                    errors?.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Enter email"
                />
                {errors?.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right font-medium">
                Role
              </Label>
              <div className="col-span-3">
                <Select {...register("role")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="LEARNER">Learner</SelectItem>
                  </SelectContent>
                </Select>
                {errors?.role && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.role?.message}
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
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
