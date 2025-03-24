"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  buttonText: string;
  onSubmit: () => void;
  dialogTrigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ConfirmationDialog({
  title,
  description,
  buttonText,
  onSubmit,
  dialogTrigger,
  open,
  onOpenChange,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {dialogTrigger}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange?.(false);
            }}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              onSubmit();
              onOpenChange?.(false);
            }}
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
