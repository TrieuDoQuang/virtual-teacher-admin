"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export function ConfirmationDialog({ title, description, buttonText, onSubmit, dialogTrigger}: {title: string, description: string, buttonText: string, onSubmit: () => void, dialogTrigger: React.ReactNode}) {
  
  const handleSubmit = () => {
    onSubmit();
  }

  return (
    <Dialog>
      {dialogTrigger}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="cursor-pointer" variant="outline" onClick={handleSubmit}>{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
