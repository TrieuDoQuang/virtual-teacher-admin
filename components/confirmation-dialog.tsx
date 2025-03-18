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
import { useState } from "react";
export function ConfirmationDialog({
  title,
  description,
  buttonText,
  onSubmit,
  dialogTrigger,
}: {
  title: string;
  description: string;
  buttonText: string;
  onSubmit: () => void;
  dialogTrigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {dialogTrigger}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => {
              handleSubmit();
              setOpen(false);
            }}
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
